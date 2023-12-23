import { Env, Hono } from "hono";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { maximumApp } from "./route";

const app = new Hono<Env>()
	.use(
		"*",
		cors({
			origin: "http://localhost:5173",
		}),
	)
	.route("/", maximumApp);

showRoutes(app);

export default app;
export type AppType = typeof app;
