export const AUTH_COOKIE_NAME = "_maximum_session";
export const AUTH_CONTEXT_KEY = "user_id";

export const AUTH_COOKIE_POLICY = (isDev: boolean) => ({
  path: "/",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "Lax" as const,
  secure: !isDev,
});
