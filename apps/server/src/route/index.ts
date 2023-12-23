import { Hono } from "hono";
import { userApp } from "./user";
import { Env } from "../config/env";
import { loginApp } from "./login";

export const maximumApp = new Hono<Env>()
  .route("/users", userApp)
  .route("/login", loginApp);
