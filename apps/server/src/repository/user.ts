import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { users } from "../db/schema";

type CreateUserInput = {
	email: string;
	username: string;
	hashedPassword: Uint8Array;
	salt: Uint8Array;
};

type CreateUserOutput = {
	id: string;
};

type GetByIdInput = {
	id: string;
};

type GetByEmailOutput = {
	id: string;
	email: string;
	username: string;
	hashedPassword: Uint8Array;
	salt: Uint8Array;
} | null;

type GetByEmailInput = {
	email: string;
};

type GetByIdOutput = {
	id: string;
	email: string;
	username: string;
	hashedPassword: Uint8Array;
	salt: Uint8Array;
} | null;

export interface IUserRepository {
	create: (input: CreateUserInput) => Promise<CreateUserOutput>;
	getById: (input: GetByIdInput) => Promise<GetByIdOutput>;
	getByEmail: (input: GetByEmailInput) => Promise<GetByEmailOutput>;
}

export class UserRepository implements IUserRepository {
	private client: ReturnType<typeof db>;

	constructor(d1db: D1Database) {
		this.client = db(d1db);
	}

	async create(param: CreateUserInput) {
		const id = crypto.randomUUID();
		await this.client.insert(users).values({
			id,
			email: param.email,
			username: param.username,
			hashed_password: param.hashedPassword,
			salt: param.salt,
		});

		return { id };
	}

	async getById(input: GetByIdInput) {
		const res = await this.client
			.select()
			.from(users)
			.where(eq(users.id, input.id))
			.limit(1);

		const user = res.at(0);

		if (!user) {
			return null;
		}

		return {
			id: user.id,
			email: user.email,
			username: user.username,
			hashedPassword: user.hashed_password as Uint8Array,
			salt: user.salt as Uint8Array,
		};
	}

	async getByEmail({ email }: GetByEmailInput) {
		const res = await this.client
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		const user = res.at(0);

		if (!user) {
			return null;
		}

		return {
			id: user.id,
			email: user.email,
			username: user.username,
			hashedPassword: user.hashed_password as Uint8Array,
			salt: user.salt as Uint8Array,
		};
	}
}
