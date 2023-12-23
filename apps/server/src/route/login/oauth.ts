import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { url, maxLength, minLength, object, string } from "valibot";
import { Env } from "../../config/env";
import { OAuthRepository } from "../../repository/oauth";
import { OAuthService } from "../../service/oauth";
import { hashSecret } from "../../util/crypto";

const oauthAuthorizeRequestQuerySchema = object({
	client_id: string(),
	response_type: string(),
	state: string(),
});

const oauthCreateClientRequestSchema = object({
	client_name: string([
		minLength(3, "client_nameは3文字以上である必要があります"),
		maxLength(32, "client_nameは32文字以下である必要があります"),
	]),
	redirect_uri: string([url("redirect_uriはURLである必要があります")]),
});

const ALLOWED_RESPONSE_TYPE = ["code"];

export const oauthApp = new Hono<Env>()
	.get(
		"/authorize",
		vValidator("query", oauthAuthorizeRequestQuerySchema),
		async (c) => {
			// client_id, redirect_uri, response_type, state がリクエストのクエリパラメータに存在するか確認
			const { client_id, response_type, state } = c.req.valid("query");

			// response_type が code か確認 (code 以外は未対応)
			if (!ALLOWED_RESPONSE_TYPE.includes(response_type)) {
				return c.json(
					{ message: `response_type ${response_type} is not supported` },
					400,
				);
			}

			const oauthRepo = new OAuthRepository(c.env.DB);
			const oauthService = new OAuthService(oauthRepo);

			// client_id が　clients テーブルに存在するか確認
			// redirect_uri が clients テーブルに存在するか確認
			const client = await oauthService.getClient(client_id);
			if (!client) {
				return c.json({ message: `client ${client_id} is not found` }, 404);
			}

			// code を生成する
			// code を DB に保存する
			let code: string;
			try {
				code = await oauthService.createCode(client_id, state);
			} catch (e) {
				console.error(e);
				return c.json({ message: "error" }, 500);
			}

			// りダイレクト先の URL に state を付与する
			// リダイレクト先の URL に code を付与する
			const redirectUri = new URL(
				`${client.redirectUri}?state=${state}&code=${code}`,
			);

			// code が付与された URL にリダイレクトする
			return c.redirect(redirectUri.toString());
		},
	)
	.post(
		"/clients",
		vValidator("json", oauthCreateClientRequestSchema),
		async (c) => {
			const { client_name, redirect_uri } = c.req.valid("json");

			const oauthRepo = new OAuthRepository(c.env.DB);
			const oauthService = new OAuthService(oauthRepo);

			const clientSecret = crypto.getRandomValues(new Uint8Array(32));
			const { hash, salt } = await hashSecret(clientSecret);

			let clientId: string;
			try {
				clientId = await oauthService.createClient({
					name: client_name,
					redirectUri: redirect_uri,
					hashedSecret: hash,
					salt: salt,
				});
			} catch (e) {
				console.error(e);
				return c.json({ message: "error" }, 500);
			}

			return c.json({ client_id: clientId });
		},
	);
