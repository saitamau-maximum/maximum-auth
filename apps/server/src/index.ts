import { Env, Hono } from "hono";
import { showRoutes } from "hono/dev";
import { maximumApp } from "./route";

const app = new Hono<Env>();

app.route("/", maximumApp);

showRoutes(app);

export default app;
