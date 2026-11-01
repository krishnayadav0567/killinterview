// Firebase Authentication provider for Google sign-in.
// This file owns Firebase initialization only; js/auth.js owns the shared UI.

(function () {
  const config = window.DIM_FIREBASE_CONFIG || {};
  const FIREBASE_SCRIPTS = [
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"
  ];

  let firebaseApp = null;
  let firebaseAuth = null;
  let initializationPromise = null;
  let redirectResultPromise = null;
  let lastError = null;

  function isConfigured() {
    const required = ["apiKey", "authDomain", "projectId", "appId"];
    return required.every((key) => {
      const value = String(config[key] || "").trim();
      return value && !/^YOUR_|^REPLACE_/i.test(value);
    });
  }

  function getConfigError() {
    return new Error("Firebase Google sign-in is not configured. Add the web app values to js/firebase-config.js.");
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (window.firebase && window.firebase.auth && window.firebase.firestore) {
          resolve();
          return;
        }
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load Firebase script: ${src}`));
      document.head.appendChild(script);
    });
  }

  function loadFirebaseScripts() {
    if (window.firebase && window.firebase.initializeApp && window.firebase.auth && window.firebase.firestore) {
      return Promise.resolve(window.firebase);
    }
    if (!window.__DIM_FIREBASE_SCRIPTS_PROMISE) {
      window.__DIM_FIREBASE_SCRIPTS_PROMISE = FIREBASE_SCRIPTS
        .reduce((promise, src) => promise.then(() => loadScript(src)), Promise.resolve())
        .then(() => window.firebase);
    }
    return window.__DIM_FIREBASE_SCRIPTS_PROMISE;
  }

  async function initFirebaseAuth() {
    if (firebaseAuth) return firebaseAuth;
    if (!isConfigured()) throw getConfigError();
    if (initializationPromise) return initializationPromise;

    initializationPromise = loadFirebaseScripts()
      .then((firebase) => {
        if (!firebase || !firebase.initializeApp || !firebase.auth) {
          throw new Error("Firebase Auth SDK did not load correctly.");
        }
        firebaseApp = firebase.apps && firebase.apps.length
          ? firebase.app()
          : firebase.initializeApp(config);
        firebaseAuth = firebaseApp.auth();
        firebaseAuth.useDeviceLanguage();
        redirectResultPromise = firebaseAuth.getRedirectResult().catch((error) => {
          lastError = error;
          return null;
        });
        return redirectResultPromise.then(() => firebaseAuth);
      })
      .catch((error) => {
        lastError = error;
        initializationPromise = null;
        firebaseApp = null;
        firebaseAuth = null;
        throw error;
      });

    return initializationPromise;
  }

  function getAuth() {
    return firebaseAuth;
  }

  function shouldUseRedirect(error) {
    return [
      "auth/popup-blocked",
      "auth/operation-not-supported-in-this-environment",
      "auth/web-storage-unsupported"
    ].includes(error?.code);
  }

  async function signInWithGoogle() {
    const auth = await initFirebaseAuth();
    const provider = new window.firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await auth.signInWithPopup(provider);
      lastError = null;
      return result.user;
    } catch (error) {
      lastError = error;
      if (!shouldUseRedirect(error)) throw error;
      await auth.signInWithRedirect(provider);
      return null;
    }
  }

  async function signOut() {
    if (!firebaseAuth) return;
    await firebaseAuth.signOut();
  }

  function onAuthStateChanged(callback) {
    return firebaseAuth ? firebaseAuth.onAuthStateChanged(callback) : () => {};
  }

  function getCurrentUser() {
    return firebaseAuth ? firebaseAuth.currentUser : null;
  }

  function getLastError() {
    return lastError;
  }

  function getUserProfile(user) {
    if (!user) return null;
    return {
      sub: user.uid,
      name: user.displayName || user.email || "Google user",
      email: user.email || "",
      picture: user.photoURL || ""
    };
  }

  window.DIMFirebaseAuth = {
    initFirebaseAuth,
    getAuth,
    signInWithGoogle,
    signOut,
    onAuthStateChanged,
    getCurrentUser,
    getLastError,
    getUserProfile,
    isConfigured
  };
})();
