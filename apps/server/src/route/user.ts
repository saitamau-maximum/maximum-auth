import { createMiddleware } from "hono/factory";
import { Hono } from "hono";
import { UserRepository } from "../repository/user";

import { object, string } from "valibot";
import { vValidator } from "@hono/valibot-validator";
import { UserService } from "../service/user";
import { setCookie, getCookie } from "hono/cookie";
import {
  AUTH_CONTEXT_KEY,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_POLICY,
} from "../config/auth";
import { Env } from "../config/env";

const userPostRequestSchema = object({
  username: string(),
  email: string(),
  password: string(),
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

export const userApp = new Hono<Env>();

userApp.post("/", vValidator("json", userPostRequestSchema), async (c) => {
  const body = c.req.valid("json");
  const userRepo = new UserRepository(c.env.DB);
  const userService = new UserService(userRepo);

  try {
    await userService.create(body.username, body.email, body.password);
    return c.json({ message: "ok" });
  } catch (e) {
    console.error(e);
    return c.json({ message: "error" }, 500);
  }
});

userApp.post("/auth", vValidator("json", userAuthRequestSchema), async (c) => {
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
      AUTH_COOKIE_POLICY(c.env.ENV === "development")
    );
    return c.json({ message: "ok" });
  } catch (e) {
    console.error(e);
    return c.json({ message: "error" }, 500);
  }
});

userApp.get("/me", userAuthMiddleware, async (c) => {
  const userId = c.get(AUTH_CONTEXT_KEY);
  const userRepo = new UserRepository(c.env.DB);
  const user = await userRepo.getById({ id: userId });

  if (!user) {
    return c.json({ message: "error" }, 401);
  }

  return c.json({ message: "ok", user });
});
