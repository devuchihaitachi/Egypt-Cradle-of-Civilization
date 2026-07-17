# Design Spec: Language Prefix in URL Routing

**Date:** 2026-07-17  
**Status:** Draft  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Adding Language Prefix to URLs (e.g., `/en/pyramids`, `/ar/pyramids`)

---

## 1. Project Goal & Overview
Currently, the website has URLs like `/pyramids` and `/monuments`, but the language is toggled via custom state (stored in `localStorage`). Changing the language does not update the URL, and users cannot share a direct link to the Arabic or English version of a page.

The goal is to modify the router and language context so that:
1. All routes are prefixed with the language code (e.g., `/en/pyramids`, `/ar/pyramids`).
2. Toggling the language updates the URL prefix (e.g. `/en/pyramids` -> `/ar/pyramids`) and changes the interface language.
3. Accessing a URL without a language prefix (e.g., `/pyramids`) automatically redirects the user to the default/stored language (e.g., `/en/pyramids`).
4. Page transitions and unit tests continue to work correctly.

---

## 2. Proposed Changes

### File Modifications

#### [MODIFY] [App.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/App.jsx)
- Wrap `LanguageProvider` inside `BrowserRouter` so it can use routing hooks (`useLocation` and `useNavigate`).
- Prepend `/:lang` to all `<Route>` path declarations (e.g., `<Route path="/:lang/pyramids" element={<Pyramids />} />`).

#### [MODIFY] [LanguageContext.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/context/LanguageContext.jsx)
- Import routing hooks `useLocation` and `useNavigate` from `react-router-dom`.
- Extract the language from the first segment of `location.pathname` (i.e. `/en/...` -> `en`, `/ar/...` -> `ar`).
- Redirect URLs without a language prefix to their prefixed counterpart using the last stored language (defaulting to `en`).
- Update `toggleLanguage` to replace the language segment of the current URL and navigate to the new path.

#### [MODIFY] [Router.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/components/Router.jsx)
- Import `useLanguage` from `../context/LanguageContext` to know the current language.
- Update `pathToPage` to parse page names from the second segment of the path (since the first segment is now the language).
- Update `pageToPath` to prepend the current language prefix.

---

## 3. Verification Plan

### Automated Tests
- Run `npm run test` and check that tests pass.
- Update any mocks or test configurations that require router context.

### Manual Verification
- Access `http://localhost:3000/` -> should redirect to `http://localhost:3000/en` or `http://localhost:3000/ar`.
- Click the language toggle button -> URL should change (e.g. `/en` -> `/ar`) and direction/content should update.
- Navigate to Pyramids page -> URL should be `/en/pyramids` (or `/ar/pyramids`).
- Manually enter `http://localhost:3000/pyramids` -> should redirect to `http://localhost:3000/en/pyramids`.
