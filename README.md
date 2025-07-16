# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# Frontend Overview

This frontend is built using **React** with a focus on UX polish, authentication flows, and seamless integration with the FastAPI backend and Supabase authentication. The app is structured for scalability and state persistence.

## Authentication & Session Management

* Integrated Google OAuth via Supabase PKCE flow:

  * Uses `/auth/google` to initiate login.
  * Displays an intermediate screen: "Signing in with Google..." during token exchange.
* Prevented duplicate OAuth runs using `useRef` in the `GoogleLogin` component.
* Tokens (`access_token`, `refresh_token`, `user_id`, `email`) are stored in **Redux** with **Redux Persist** to enable seamless state restoration.
* Implemented Axios interceptors:

  * Auto-attaches tokens to outgoing requests.
  * Handles 401 errors by retrying after token refresh.
* Implemented auto-logout on token expiry.
* Configured cross-tab session invalidation using a custom `BroadcastChannel` implementation.

## Intake Form Flow

* Designed and implemented a multi-step intake form UI.
* Supported partial step-by-step form submissions.
* Injected associated fields like `client_email` and `designer_email` into the project payload from Redux state.
* Integrated brand guide file upload:

  * Validates file type and ensures a single file upload.
  * Submits file metadata along with intake form data.
* Added animated components and smooth transitions between steps.
* Included `KingOfTheHill` visual tone selector component:

  * Displays a head-to-head visual swiper.
  * Prepopulates tone choices based on backend data.

## Project Creation Flow

* Connected frontend project creation form to backend API.
* Submitted authenticated requests with `access_token` to ensure secure access.
* Injected associated fields like `client_email` and `designer_email` into the project payload from Redux state.
* Used Axios to POST form data to the `/projects` endpoint.
* Verified that the backend performs upsert logic (create if not exists, update if exists).
* Displayed success/failure UI feedback based on backend responses.

## State Management

* Implemented global state handling using **Redux Toolkit**.
* Persisted auth state across sessions using **Redux Persist**.
* Auth state includes: `accessToken`, `refreshToken`, `userId`, `email`, and `loginTime`.

## Protected Routes & Routing

* Added route protection to restrict unauthenticated access.
* Redirects users to login page if token is invalid or missing.
* Navigation blocked if backend form submission fails.

## Developer Experience

* Configured absolute path aliasing for clean imports.
* Added descriptive comments and modularized components for scalability.
* Structured for future evolution:

  * Intake tones will eventually be pulled from Supabase instead of hardcoded config.
  * Designed to support A/B testing and designer-specific tone configurations.

## Future Integration Support

* Designed form and tone selector to be compatible with future `pgvector` embeddings.
* Clean separation of components to support AI-driven recommendations and previews.
