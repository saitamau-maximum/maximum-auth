import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { email, maxLength, minLength, object, string } from "valibot";
import { JWTPayload } from "../config/auth";
import { Env } from "../config/env";
import { UserRepository } from "../repository/user";
import { UserService } from "../service/user";
import { jwtMiddleware } from "../util/middleware";

const userPostRequestSchema = object({
	username: string([minLength(3), maxLength(32)]),
	email: string([email()]),
	password: string([minLength(8), maxLength(64)]),
});

const userAuthRequestSchema = object({
	email: string(),
	password: string(),
});

export const userApp = new Hono<Env>()
	.post(
		"/",
		vValidator("json", userPostRequestSchema, (result, c) => {
			if (!result.success) {
				return c.json({ message: "Invalid request" }, 400);
			}
		}),
		async (c) => {
			const body = c.req.valid("json");
			const userRepo = new UserRepository(c.env.DB);
			const userService = new UserService(userRepo);

			try {
				const userId = await userService.create(
					body.username,
					body.email,
					body.password,
				);

				const payload = {
					uid: userId,
				} satisfies JWTPayload;
				const token = await sign(payload, c.env.JWT_SECRET);

				return c.json({ type: "UserCreated" as const, token });
			} catch (e) {
				console.error(e);
				return c.json({ type: "InternalServerError" as const }, 500);
			}
		},
	)
	.post(
		"/auth",
		vValidator("json", userAuthRequestSchema, (result, c) => {
			if (!result.success) {
				return c.json({ message: "Invalid request" }, 400);
			}
		}),
		async (c) => {
			const body = c.req.valid("json");
			const userRepo = new UserRepository(c.env.DB);
			const userService = new UserService(userRepo);

			try {
				const user = await userService.authenticate(body.email, body.password);

				if (!user) {
					return c.json({ type: "AuthenticationFailed" as const }, 401);
				}

				const payload = {
					uid: user.id,
				} satisfies JWTPayload;
				const token = await sign(payload, c.env.JWT_SECRET);

				return c.json({ type: "AuthenticationSucceeded" as const, token });
			} catch (e) {
				console.error(e);
				return c.json({ type: "InternalServerError" as const }, 500);
			}
		},
	)
	.get("/me", jwtMiddleware, async (c) => {
		const payload = c.get("jwtPayload") as JWTPayload;

		const userRepo = new UserRepository(c.env.DB);
		const user = await userRepo.getById({ id: payload.uid });

		if (!user) {
			return c.json({ type: "UserNotFound" as const }, 404);
		}

		return c.json({
			type: "UserFound" as const,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		});
	});
