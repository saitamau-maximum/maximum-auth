import { createMiddleware } from "hono/factory";
import { Hono } from "hono";
import { object, string } from "valibot";
import { vValidator } from "@hono/valibot-validator";
import { setCookie, getCookie } from "hono/cookie";
import { Env } from "../../config/env";
import { OAuthRepository } from "../../repository/oauth";
import { OAuthService } from "../../service/oauth";

const oauthAuthorizeRequestQuerySchema = object({
  client_id: string(),
  response_type: string(),
  state: string(),
});

const ALLOWED_RESPONSE_TYPE = ["code"];

export const oauthApp = new Hono<Env>().get(
  "/authorize",
  vValidator("query", oauthAuthorizeRequestQuerySchema),
  async (c) => {
    // client_id, redirect_uri, response_type, state がリクエストのクエリパラメータに存在するか確認
    const { client_id, response_type, state } = c.req.valid("query");

    // response_type が code か確認 (code 以外は未対応)
    if (!ALLOWED_RESPONSE_TYPE.includes(response_type)) {
      return c.json(
        { message: `response_type ${response_type} is not supported` },
        400
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
      `${client.redirectUri}?state=${state}&code=${code}`
    );

    // code が付与された URL にリダイレクトする
    return c.redirect(redirectUri.toString());
  }
);
