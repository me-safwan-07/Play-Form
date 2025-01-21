export const GOOGLE_OAUTH_ENABLED =
  import.meta.env.VITE_GOOGLE_CLIENT_ID && import.meta.env.VITE_GOOGLE_CLIENT_SECRET ? true : false;
export const EMAIL_AUTH_ENABLED = import.meta.env.VITE_EMAIL_AUTH_DISABLED !== "1";
export const PASSWORD_RESET_DISABLED = import.meta.env.VITE_PASSWORD_RESET_DISABLED === "1";

// export const SIGNUP_ENABLED = process.env.SIGNUP_DISABLED !== "1";
// export const INVITE_DISABLED = process.env.VITE_INVITE_DISABLED === "1";

export const FORMS_PER_PAGE = 12;

export const FORM_BG_COLORS = [
  "#FFF2D8",
  "#EAD7BB",
  "#BCA37F",
  "#113946",
  "#04364A",
  "#176B87",
  "#64CCC5",
  "#DAFFFB",
  "#132043",
  "#1F4172",
  "#F1B4BB",
  "#FDF0F0",
  "#001524",
  "#445D48",
  "#D6CC99",
  "#FDE5D4",
  "#BEADFA",
  "#D0BFFF",
  "#DFCCFB",
  "#FFF8C9",
  "#FF8080",
  "#FFCF96",
  "#F6FDC3",
  "#CDFAD5",
];
