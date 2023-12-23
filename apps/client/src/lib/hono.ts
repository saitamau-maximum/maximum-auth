import { hc } from "hono/client";
import type { AppType } from "maximum-auth-server";
import { SERVER_URL } from "../config";

export const client = hc<AppType>(SERVER_URL);
