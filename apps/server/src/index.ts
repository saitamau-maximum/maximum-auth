import { Hono } from "hono";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { Env } from "./config/env";
import { maximumApp } from "./route";

const app = new Hono<Env>()
	.use("*", (c, next) =>
		cors({
			origin: [c.env.CLIENT_ORIGIN],
		})(c, next),
	)
	.route("/", maximumApp);

showRoutes(app);

export default app;
export type AppType = typeof app;
