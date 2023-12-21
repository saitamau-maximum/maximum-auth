import { IOAuthRepository } from "../repository/oauth";
import { hashSecret } from "../util/crypto";
import { OAuthService } from "./oauth";
import { UserService } from "./user";

class MockOAuthRepository implements IOAuthRepository {
  getClientById = vi.fn();
  createAuthorizationCode = vi.fn();
  createClient = vi.fn();
}

describe("OAuthService", () => {
  let oauthRepo: MockOAuthRepository;
  let oauthService: OAuthService;

  beforeEach(() => {
    oauthRepo = new MockOAuthRepository();
    oauthService = new OAuthService(oauthRepo);
  });

  describe("getClient", () => {
    it("should call oauthRepo.getClientById", async () => {
      await oauthService.getClient("clientId");
      expect(oauthRepo.getClientById).toBeCalledTimes(1);
      expect(oauthRepo.getClientById).toBeCalledWith({ id: "clientId" });
    });
  });

  describe("createCode", () => {
    it("should call oauthRepo.createAuthorizationCode", async () => {
      const code = await oauthService.createCode("clientId", "state");
      expect(oauthRepo.createAuthorizationCode).toBeCalledTimes(1);
      expect(oauthRepo.createAuthorizationCode).toBeCalledWith({
        clientId: "clientId",
        state: "state",
        code: expect.any(String),
      });
      expect(code).not.toBe(null);
    });
  });

  describe("verifyClient", () => {
    it("should return false if client does not exist", async () => {
      oauthRepo.getClientById.mockResolvedValueOnce(null);
      const res = await oauthService.verifyClient("clientId", "clientSecret");
      expect(res).toBe(false);
    });

    it("should return false if clientSecret is wrong", async () => {
      oauthRepo.getClientById.mockResolvedValueOnce({
        id: "clientId",
        hashedSecret: new Uint8Array([1, 2, 3]),
        salt: new Uint8Array([1, 2, 3]),
      });
      const res = await oauthService.verifyClient("clientId", "clientSecret");
      expect(res).toBe(false);
    });

    it("should return true if clientSecret is correct", async () => {
      const { hash, salt } = await hashSecret("clientSecret");
      oauthRepo.getClientById.mockResolvedValueOnce({
        id: "clientId",
        hashedSecret: hash,
        salt,
      });
      const res = await oauthService.verifyClient("clientId", "clientSecret");
      expect(res).toBe(true);
    });
  });
});
