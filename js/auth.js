(function () {
  const PROFILE_KEY = "developer-interview-master-google-profile-v1";
  const GOOGLE_SCRIPT_URL = "https://accounts.google.com/gsi/client";
  const config = window.DIM_AUTH_CONFIG || {};

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

  function decodeJwtPayload(token) {
    try {
      const payload = token.split(".")[1];
      const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = decodeURIComponent(window.atob(normalized).split("").map((character) => `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`).join(""));
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  }

  function renderSignedIn(profile, mount) {
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
    signOut.addEventListener("click", () => {
      writeProfile(null);
      if (window.google && window.google.accounts && window.google.accounts.id) window.google.accounts.id.disableAutoSelect();
      renderAuth(mount);
    });
  }

  function renderSetupMessage(mount) {
    mount.innerHTML = `<span class="auth-unconfigured" title="Add a Google OAuth client ID in js/auth-config.js">Google login</span>`;
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
    window.google.accounts.id.renderButton(document.getElementById("google-sign-in-button"), {
      type: "standard",
      theme: "outline",
      size: "medium",
      text: "signin_with",
      shape: "rectangular",
      logo_alignment: "left",
      width: 210
    });
  }

  function handleCredentialResponse(response) {
    const profile = decodeJwtPayload(response.credential);
    if (!profile) return;
    writeProfile({
      sub: profile.sub,
      name: profile.name || "Google user",
      email: profile.email || "",
      picture: profile.picture || ""
    });
    const mount = document.getElementById("auth-container");
    if (mount) renderSignedIn(readProfile(), mount);
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

  function renderAuth(mount) {
    const profile = readProfile();
    if (profile) {
      renderSignedIn(profile, mount);
      return;
    }
    if (!getGoogleClientId()) {
      renderSetupMessage(mount);
      return;
    }
    mount.innerHTML = "<span class=\"auth-loading\">Loading Google login…</span>";
    loadGoogleScript().then(() => renderGoogleButton(mount)).catch(() => {
      mount.innerHTML = "<span class=\"auth-error\">Google login is unavailable right now.</span>";
    });
  }

  function initAuth() {
    const mount = document.getElementById("auth-container");
    if (mount && window.DIM) renderAuth(mount);
  }

  window.DIMAuth = { initAuth, handleCredentialResponse };
  document.addEventListener("DOMContentLoaded", initAuth);
})();