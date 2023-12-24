import { IUserRepository } from "../repository/user";
import { hashSecret } from "../util/crypto";
import { UserService } from "./user";

class MockUserRepository implements IUserRepository {
	create = vi.fn().mockReturnValue({ id: "this-is-mock-id" });
	getById = vi.fn();
	getByEmail = vi.fn();
}

describe("UserService", () => {
	let userRepo: MockUserRepository;
	let userService: UserService;

	beforeEach(() => {
		userRepo = new MockUserRepository();
		userService = new UserService(userRepo);
	});

	describe("create", () => {
		it("should call userRepo.create", async () => {
			const id = await userService.create(
				"username",
				"hoge@example.com",
				"password",
			);
			expect(userRepo.create).toBeCalledTimes(1);
			expect(id).toBe("this-is-mock-id");
		});
	});

	describe("authenticate", () => {
		it("should return false if user does not exist", async () => {
			userRepo.getByEmail.mockResolvedValueOnce(null);
			const res = await userService.authenticate("username", "password");
			expect(res).toBe(null);
		});

		it("should return false if password is wrong", async () => {
			userRepo.getByEmail.mockResolvedValueOnce({
				id: "id",
				username: "username",
				hashedPassword: new Uint8Array([1, 2, 3]),
				salt: new Uint8Array([1, 2, 3]),
			});
			const res = await userService.authenticate("username", "password");
			expect(res).toBe(null);
		});

		it("should return true if password is correct", async () => {
			const { hash, salt } = await hashSecret("password");
			userRepo.getByEmail.mockResolvedValueOnce({
				id: "id",
				username: "username",
				hashedPassword: hash,
				salt,
			});
			const res = await userService.authenticate("username", "password");
			expect(res).toStrictEqual({
				id: "id",
				username: "username",
				hashedPassword: hash,
				salt,
			});
		});
	});
});
