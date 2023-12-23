import type { AppType } from "maximum-auth-server";
import { hc } from "hono/client";
import { SERVER_URL } from "../config";

export const client = hc<AppType>(SERVER_URL);
