(function () {
  const PROFILE_KEY = "developer-interview-master-google-profile-v1";
  const GOOGLE_SCRIPT_URL = "https://accounts.google.com/gsi/client";
  const config = window.DIM_AUTH_CONFIG || {};
  const state = {
    mount: null,
    provider: null,
    firebaseUnsubscribe: null,
    initialized: false,
    initializationPromise: null,
    busy: false
  };

  function readProfile() {
    try {
      const raw = window.localStorage.getItem(PROFILE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeProfile(profile) {
    try {
      if (profile) window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      else window.localStorage.removeItem(PROFILE_KEY);
    } catch (error) {
      // Private browsing modes can reject localStorage; the app continues in memory.
    }
  }

  function getGoogleClientId() {
    return String(config.googleClientId || "").trim();
  }

  function getFirebaseAuth() {
    const firebaseAuth = window.DIMFirebaseAuth;
    return firebaseAuth && firebaseAuth.isConfigured() ? firebaseAuth : null;
  }

  function getProvider() {
    if (getFirebaseAuth()) return "firebase";
    if (getGoogleClientId()) return "gis";
    return null;
  }

  function decodeJwtPayload(token) {
    try {
      const payload = token.split(".")[1];
      const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
      const decoded = decodeURIComponent(window.atob(padded).split("").map((character) => `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`).join(""));
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  }

  function firebaseErrorMessage(error) {
    const code = error?.code || "";
    if (code === "auth/unauthorized-domain") {
      const hostname = window.location.hostname || "this hostname";
      const isLocalAlias = hostname === "127.0.0.1" || hostname === "[::1]";
      const localAdvice = isLocalAlias
        ? "You can also open the app at http://localhost:3000/login.html."
        : "Add this hostname under Firebase Console → Authentication → Settings → Authorized domains.";
      return `Firebase does not authorize “${hostname}” for Google sign-in. ${localAdvice}`;
    }
    const messages = {
      "auth/popup-closed-by-user": "The Google sign-in window was closed before login finished.",
      "auth/cancelled-popup-request": "Another Google sign-in request is already in progress.",
      "auth/invalid-api-key": "The Firebase API key is invalid. Check js/firebase-config.js.",
      "auth/invalid-credential": "Google returned an invalid credential. Check the Google provider and OAuth configuration in Firebase.",
      "auth/network-request-failed": "The network request failed. Check your connection and try again."
    };
    return messages[code] || error?.message || "Google sign-in failed. Please try again.";
  }

  function renderSignedIn(profile, mount, signOutHandler) {
    const name = profile.name || profile.email || "Google user";
    const picture = profile.picture
      ? `<img class="auth-avatar" src="${window.DIM.escapeHTML(profile.picture)}" alt="" />`
      : "<span class=\"auth-avatar auth-avatar-fallback\" aria-hidden=\"true\">G</span>";
    mount.innerHTML = `<div class="auth-user"><button class="auth-user-button" type="button" aria-expanded="false" aria-controls="auth-menu">${picture}<span class="auth-user-name">${window.DIM.escapeHTML(name)}</span><span class="auth-user-chevron" aria-hidden="true">⌄</span></button><div id="auth-menu" class="auth-menu" hidden><span class="auth-email">${window.DIM.escapeHTML(profile.email || "Signed in with Google")}</span><button class="auth-sign-out" type="button">Sign out</button></div></div>`;
    const userButton = mount.querySelector(".auth-user-button");
    const menu = mount.querySelector(".auth-menu");
    const signOut = mount.querySelector(".auth-sign-out");

    userButton.addEventListener("click", () => {
      const expanded = userButton.getAttribute("aria-expanded") === "true";
      userButton.setAttribute("aria-expanded", String(!expanded));
      menu.hidden = expanded;
    });
    signOut.addEventListener("click", async () => {
      signOut.disabled = true;
      signOut.textContent = "Signing out…";
      try {
        await signOutHandler();
      } catch (error) {
        signOut.disabled = false;
        signOut.textContent = "Sign out";
        renderError(mount, firebaseErrorMessage(error));
      }
    });
  }

  function renderSetupMessage(mount) {
    mount.innerHTML = `<div class="google-login-wrap"><a class="button button-secondary auth-setup-link" href="login.html" title="Open the Google sign-in page">Sign in with Google <span aria-hidden="true">→</span></a></div>`;
  }

  function renderError(mount, message) {
    mount.innerHTML = `<span class="auth-error" role="alert">${window.DIM.escapeHTML(message)}</span>`;
  }

  function renderFirebaseButton(mount) {
    mount.innerHTML = `<div class="google-login-wrap"><button id="firebase-google-signin" class="button button-secondary" type="button"><span aria-hidden="true">G</span><span>Sign in with Google</span></button></div>`;
    const button = mount.querySelector("#firebase-google-signin");
    button.addEventListener("click", () => signIn());
  }

  function renderGoogleButton(mount) {
    mount.innerHTML = `<div class="google-login-wrap"><div id="google-sign-in-button"></div><small class="auth-hint">Sign in with Google to save your profile on this device.</small></div>`;
    window.google.accounts.id.initialize({
      client_id: getGoogleClientId(),
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: true
    });
    window.google.accounts.id.renderButton(mount.querySelector("#google-sign-in-button"), {
      type: "standard",
      theme: "outline",
      size: "medium",
      text: "signin_with",
      shape: "rectangular",
      logo_alignment: "left",
      width: 210
    });
  }

  function loadGoogleScript() {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        resolve();
        return;
      }
      const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_URL}"]`);
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = GOOGLE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function notifyAuthChange(user, provider) {
    window.dispatchEvent(new CustomEvent("dim:auth-change", { detail: { user, provider } }));
  }

  async function renderFirebaseAuth(mount) {
    const firebaseAuth = getFirebaseAuth();
    mount.innerHTML = "<span class=\"auth-loading\">Loading Google login…</span>";
    try {
      const auth = await firebaseAuth.initFirebaseAuth();
      if (state.firebaseUnsubscribe) state.firebaseUnsubscribe();
      state.firebaseUnsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        state.busy = false;
        if (user) {
          const profile = firebaseAuth.getUserProfile(user);
          writeProfile(profile);
          renderSignedIn(profile, mount, () => firebaseAuth.signOut());
          notifyAuthChange(user, "firebase");
        } else {
          writeProfile(null);
          renderFirebaseButton(mount);
          notifyAuthChange(null, "firebase");
        }
      });
      state.provider = "firebase";
      return auth;
    } catch (error) {
      state.provider = "firebase";
      renderError(mount, firebaseErrorMessage(error));
      throw error;
    }
  }

  async function renderAuth(mount) {
    state.mount = mount;
    const provider = getProvider();
    if (!provider) {
      state.provider = null;
      renderSetupMessage(mount);
      return null;
    }
    if (provider === "firebase") return renderFirebaseAuth(mount);

    state.provider = "gis";
    const profile = readProfile();
    if (profile) {
      renderSignedIn(profile, mount, async () => {
        writeProfile(null);
        if (window.google?.accounts?.id) window.google.accounts.id.disableAutoSelect();
        renderAuth(mount);
      });
      notifyAuthChange(profile, "gis");
      return null;
    }
    mount.innerHTML = "<span class=\"auth-loading\">Loading Google login…</span>";
    try {
      await loadGoogleScript();
      renderGoogleButton(mount);
    } catch (error) {
      renderError(mount, "Google login is unavailable right now.");
    }
    return null;
  }

  async function signIn() {
    if (!state.mount) {
      const mount = document.getElementById("auth-container");
      if (mount) await initAuth();
    }
    if (state.busy) return null;
    const firebaseAuth = getFirebaseAuth();
    if (firebaseAuth) {
      state.busy = true;
      const button = state.mount?.querySelector("#firebase-google-signin");
      if (button) {
        button.disabled = true;
        button.textContent = "Opening Google…";
      }
      try {
        return await firebaseAuth.signInWithGoogle();
      } catch (error) {
        state.busy = false;
        if (state.mount) renderError(state.mount, firebaseErrorMessage(error));
        throw error;
      }
    }

    if (!getGoogleClientId()) {
      if (state.mount) renderSetupMessage(state.mount);
      return null;
    }
    await loadGoogleScript();
    window.google.accounts.id.prompt();
    return null;
  }

  async function initAuth() {
    const mount = document.getElementById("auth-container");
    if (!mount) return null;
    state.mount = mount;
    if (state.initializationPromise) return state.initializationPromise;
    state.initializationPromise = renderAuth(mount).finally(() => {
      state.initialized = true;
    });
    return state.initializationPromise;
  }

  function handleCredentialResponse(response) {
    const profile = decodeJwtPayload(response?.credential || "");
    if (!profile) {
      if (state.mount) renderError(state.mount, "Google returned an invalid credential.");
      return;
    }
    const normalizedProfile = {
      sub: profile.sub,
      name: profile.name || "Google user",
      email: profile.email || "",
      picture: profile.picture || ""
    };
    writeProfile(normalizedProfile);
    if (state.mount) {
      renderSignedIn(normalizedProfile, state.mount, async () => {
        writeProfile(null);
        if (window.google?.accounts?.id) window.google.accounts.id.disableAutoSelect();
        renderAuth(state.mount);
      });
    }
    notifyAuthChange(normalizedProfile, "gis");
  }

  window.DIMAuth = {
    initAuth,
    signIn,
    signOut: async () => {
      if (getFirebaseAuth()) return getFirebaseAuth().signOut();
      writeProfile(null);
      if (window.google?.accounts?.id) window.google.accounts.id.disableAutoSelect();
      if (state.mount) await renderAuth(state.mount);
    },
    handleCredentialResponse,
    getProvider
  };

  document.addEventListener("DOMContentLoaded", () => {
    initAuth().catch(() => {
      // The visible error is rendered by renderAuth; avoid an unhandled rejection.
    });
  });
})();
