import { Hono } from "hono";
import { Env } from "../config/env";
import { loginApp } from "./login";
import { userApp } from "./user";

export const maximumApp = new Hono<Env>()
	.route("/users", userApp)
	.route("/login", loginApp);
