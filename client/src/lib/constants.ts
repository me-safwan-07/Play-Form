export const GOOGLE_OAUTH_ENABLED =
  import.meta.env.VITE_GOOGLE_CLIENT_ID && import.meta.env.VITE_GOOGLE_CLIENT_SECRET ? true : false;
export const EMAIL_AUTH_ENABLED = import.meta.env.VITE_EMAIL_AUTH_DISABLED !== "1";
export const PASSWORD_RESET_DISABLED = import.meta.env.VITE_PASSWORD_RESET_DISABLED === "1";


export const SURVEYS_PER_PAGE = 12;
