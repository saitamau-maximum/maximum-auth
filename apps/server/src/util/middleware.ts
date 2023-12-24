import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
import { Env } from "../config/env";

export const jwtMiddleware = createMiddleware<Env>((c, next) =>
	jwt({
		secret: c.env.JWT_SECRET,
	})(c, next),
);
