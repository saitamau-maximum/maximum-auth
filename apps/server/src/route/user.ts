import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { UserRepository } from "../repository/user";

import { vValidator } from "@hono/valibot-validator";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { email, maxLength, minLength, object, string } from "valibot";
import {
	AUTH_CONTEXT_KEY,
	AUTH_COOKIE_NAME,
	AUTH_COOKIE_POLICY,
} from "../config/auth";
import { Env } from "../config/env";
import { UserService } from "../service/user";

const userPostRequestSchema = object({
	username: string([
		minLength(3, "username must be at least 3 characters"),
		maxLength(32, "username must be at most 32 characters"),
	]),
	email: string([email("email must be a valid email address")]),
	password: string([
		minLength(8, "password must be at least 8 characters"),
		maxLength(64, "password must be at most 64 characters"),
	]),
});

const userAuthRequestSchema = object({
	email: string(),
	password: string(),
});

export const userAuthMiddleware = createMiddleware<Env>(async (c, next) => {
	const uid = getCookie(c, AUTH_COOKIE_NAME);

	if (!uid) {
		return c.json({ message: "error" }, 401);
	}

	c.set(AUTH_CONTEXT_KEY, uid);

	await next();
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
			console.log("userApp.post");
			const body = c.req.valid("json");
			const userRepo = new UserRepository(c.env.DB);
			const userService = new UserService(userRepo);

			try {
				await userService.create(body.username, body.email, body.password);
				return c.json({ message: "ok" });
			} catch (e) {
				console.error(e);
				return c.json({ message: "Internal server error" }, 500);
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
					return c.json({ message: "error" }, 401);
				}

				setCookie(
					c,
					AUTH_COOKIE_NAME,
					user.id,
					AUTH_COOKIE_POLICY(c.env.ENV === "development"),
				);
				return c.json({ message: "ok" });
			} catch (e) {
				console.error(e);
				return c.json({ message: "Internal server error" }, 500);
			}
		},
	)
	.get("/me", userAuthMiddleware, async (c) => {
		const userId = c.get(AUTH_CONTEXT_KEY);
		const userRepo = new UserRepository(c.env.DB);
		const user = await userRepo.getById({ id: userId });

		if (!user) {
			deleteCookie(c, AUTH_COOKIE_NAME);
			return c.json({ type: "UserNotFound" as const }, 404);
		}

		return c.json({ type: "UserFound" as const, user });
	});
