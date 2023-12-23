import { Env, Hono } from "hono";
import { showRoutes } from "hono/dev";
import { cors } from "hono/cors";
import { maximumApp } from "./route";

const app = new Hono<Env>()
  .use(
    "*",
    cors({
      origin: "http://localhost:5173",
    })
  )
  .route("/", maximumApp);

showRoutes(app);

export default app;
export type AppType = typeof app;
