import { Hono } from "hono";
import { Env } from "../../config/env";
import { oauthApp } from "./oauth";

export const loginApp = new Hono<Env>().route("/oauth", oauthApp);
