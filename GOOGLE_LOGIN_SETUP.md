# Google login setup

The app uses **Firebase Authentication with Google** as its primary login flow. Google Identity Services remains available as an optional fallback when Firebase is not configured. The login is for the Google account only; it does not request Gmail mailbox access.

## Configure Firebase Google sign-in

1. Open Firebase Console and select the `killerinterview-fdb51` project.
2. Open **Authentication → Sign-in method** and enable the **Google** provider.
3. Open **Project settings → Your apps**. Add a Web app if one does not already exist.
4. Copy the Firebase Web SDK configuration into `/Users/krishnayadav/Desktop/Prepare for interview/js/firebase-config.js`. Keep the object shape intact:

   ```js
   window.DIM_FIREBASE_CONFIG = {
     apiKey: "...",
     authDomain: "killerinterview-fdb51.firebaseapp.com",
     projectId: "killerinterview-fdb51",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

5. In **Authentication → Settings → Authorized domains**, add every host used by the app. For local development, `localhost` is normally included; use an HTTP server such as `http://localhost:3000`, not `file://`. Add the production Netlify domain too.
6. Serve the folder:

   ```bash
   cd "/Users/krishnayadav/Desktop/Prepare for interview"
   node server.js
   ```

7. Open `http://localhost:3000/login.html` and select **Continue with Google**.

## What was fixed in the app

- All pages with the shared header now load the same Firebase auth provider.
- The login page CTA invokes the real sign-in flow instead of only re-rendering the header.
- Firebase auth state controls the signed-in profile and sign-out UI.
- Popup login falls back to redirect login when the browser blocks popups.
- Firebase errors are shown in the header instead of failing silently.

## Optional Google Identity Services fallback

If Firebase is intentionally not used, place a Google OAuth Web client ID in `/Users/krishnayadav/Desktop/Prepare for interview/js/auth-config.js`:

```js
window.DIM_AUTH_CONFIG = {
  googleClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com"
};
```

For that fallback, add each exact site origin to the OAuth client's **Authorized JavaScript origins**. The fallback stores only the decoded display profile in local storage; it does not create a server session or provide secure authorization.

## Security limitation

The static frontend can use Firebase Auth and Firestore security rules, but browser local storage is not a secure source of authorization. Do not trust the locally stored profile for protected operations. For server-side protected data, verify Firebase ID tokens on the backend or rely on Firebase Security Rules with the authenticated Firebase user.
