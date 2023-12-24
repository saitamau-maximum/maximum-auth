import { IUserRepository } from "../repository/user";
import { hashSecret, verifySecret } from "../util/crypto";

export class UserService {
	private userRepo: IUserRepository;

	constructor(_userRepo: IUserRepository) {
		this.userRepo = _userRepo;
	}

	async create(username: string, email: string, password: string) {
		const { salt, hash } = await hashSecret(password);

		const user = await this.userRepo.create({
			username,
			email,
			hashedPassword: hash,
			salt,
		});

		return user.id;
	}

	async authenticate(email: string, password: string) {
		const user = await this.userRepo.getByEmail({ email });

		if (!user) {
			return null;
		}

		const ok = await verifySecret(password, {
			salt: user.salt,
			hash: user.hashedPassword,
		});

		if (!ok) {
			return null;
		}

		return user;
	}
}
