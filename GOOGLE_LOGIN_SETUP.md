# Google login setup

The app now includes **Sign in with Google** using Google Identity Services. This is Google-account login (including Gmail accounts); it does **not** request Gmail mailbox access.

## Configure it

1. Open Google Cloud Console and create or select a project.
2. Configure the OAuth consent screen.
3. Create an **OAuth client ID** with application type **Web application**.
4. Add every URL where this static app runs to **Authorized JavaScript origins**. For local development, add the exact origin such as `http://localhost:8000`.
5. Copy the client ID into `/Users/krishnayadav/Desktop/Prepare for interview/js/auth-config.js`:

   ```js
   window.DIM_AUTH_CONFIG = {
     googleClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com"
   };
   ```

6. Serve the folder over `http://localhost` or HTTPS. Opening the files with `file://` will not work for Google sign-in.

## Important limitation

This repository is a static browser-only app. It decodes the Google ID-token payload to display the profile and stores that profile in this browser, but it does **not** create a secure server session or verify the token server-side. Do not use the browser-stored profile for protected data or authorization.

For production accounts, add a backend login endpoint that verifies the ID token signature, issuer, audience, expiry, and CSRF protections, then creates an HTTP-only session. Use the token's `sub` claim as the stable Google account identifier rather than the email address.