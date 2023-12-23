import { Hono } from "hono";
import { oauthApp } from "./oauth";
import { Env } from "../../config/env";

export const loginApp = new Hono<Env>().route("/oauth", oauthApp);
