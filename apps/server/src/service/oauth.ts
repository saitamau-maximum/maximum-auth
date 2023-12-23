import { verifySecret } from "../util/crypto";
import { IOAuthRepository } from "./../repository/oauth";

export class OAuthService {
	private oauthRepo: IOAuthRepository;

	constructor(_oauthRepo: IOAuthRepository) {
		this.oauthRepo = _oauthRepo;
	}

	async getClient(clientId: string) {
		const client = await this.oauthRepo.getClientById({
			id: clientId,
		});
		return client;
	}

	async createCode(clientId: string, state: string) {
		const code = crypto.randomUUID();
		await this.oauthRepo.createAuthorizationCode({
			clientId,
			state,
			code,
		});
		return code;
	}

	async verifyClient(clientId: string, clientSecret: string) {
		const client = await this.oauthRepo.getClientById({
			id: clientId,
		});

		if (!client) {
			return false;
		}

		const ok = await verifySecret(clientSecret, {
			salt: client.salt,
			hash: client.hashedSecret,
		});

		return ok;
	}

	async createClient(param: {
		name: string;
		redirectUri: string;
		hashedSecret: Uint8Array;
		salt: Uint8Array;
	}) {
		const id = crypto.randomUUID();
		await this.oauthRepo.createClient({
			name: param.name,
			redirectUri: param.redirectUri,
			hashedSecret: param.hashedSecret,
			salt: param.salt,
		});

		return id;
	}
}
