import { hc } from "hono/client";
import type { AppType } from "maximum-auth-server";
import { SERVER_URL } from "../config";

const getBearerToken = () => {
	const token = localStorage.getItem("token");
	if (!token) {
		return "";
	}

	return `Bearer ${token}`;
};

export const getClient = () =>
	hc<AppType>(SERVER_URL, {
		headers: {
			Authorization: getBearerToken(),
		},
	});
