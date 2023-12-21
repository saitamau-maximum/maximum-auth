import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { TUsers, authorizationCodes, clients, users } from "../db/schema";

type GetClientByIdInput = {
  id: string;
};

type GetClientByIdOutput = {
  id: string;
  name: string;
  redirectUri: string;
  hashedSecret: Uint8Array;
  salt: Uint8Array;
} | null;

type CreateAuthorizationCodeInput = {
  clientId: string;
  state: string;
  code: string;
};

type CreateAuthorizationCodeOutput = {
  id: string;
};

type CreateClientInput = {
  name: string;
  redirectUri: string;
  hashedSecret: Uint8Array;
  salt: Uint8Array;
};

type CreateClientOutput = {
  id: string;
};

export interface IOAuthRepository {
  getClientById: (input: GetClientByIdInput) => Promise<GetClientByIdOutput>;
  createAuthorizationCode: (
    input: CreateAuthorizationCodeInput
  ) => Promise<CreateAuthorizationCodeOutput>;
  createClient: (input: CreateClientInput) => Promise<CreateClientOutput>;
}

export class OAuthRepository implements IOAuthRepository {
  private client: ReturnType<typeof db>;

  constructor(d1db: D1Database) {
    this.client = db(d1db);
  }

  async getClientById(param: GetClientByIdInput) {
    const res = await this.client
      .select()
      .from(clients)
      .where(eq(clients.id, param.id))
      .limit(1);

    const client = res.at(0);

    if (!client) {
      return null;
    }

    return {
      id: client.id,
      name: client.name,
      redirectUri: client.redirect_uri,
      hashedSecret: client.hashed_secret as Uint8Array,
      salt: client.salt as Uint8Array,
    };
  }

  async createAuthorizationCode(param: CreateAuthorizationCodeInput) {
    const id = crypto.randomUUID();
    await this.client.insert(authorizationCodes).values({
      id,
      clientId: param.clientId,
      code: param.code,
      state: param.state,
    });

    return { id };
  }

  async createClient(param: CreateClientInput) {
    const id = crypto.randomUUID();

    await this.client.insert(clients).values({
      id,
      name: param.name,
      redirect_uri: param.redirectUri,
      hashed_secret: param.hashedSecret,
      salt: param.salt,
    });

    return { id };
  }
}
