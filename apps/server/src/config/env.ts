import { AUTH_CONTEXT_KEY } from "./auth";

export type Env = {
	Bindings: {
		DB: D1Database;
		ENV: string;
	};
	Variables: {
		[AUTH_CONTEXT_KEY]: string;
	};
};
