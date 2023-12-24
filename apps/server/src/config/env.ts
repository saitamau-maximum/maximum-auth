export type Env = {
	Bindings: {
		DB: D1Database;
		ENV: string;
		JWT_SECRET: string;
		CLIENT_ORIGIN: string;
	};
};
