import { hashSecret, verifySecret } from "./crypto";

describe("util/crypto", () => {
  describe("hashSecret", () => {
    it("should return salt and hash", async () => {
      const password = "myPassword";
      const encodedPassword = await hashSecret(password);

      expect(encodedPassword.salt).toBeDefined();
      expect(encodedPassword.hash).toBeDefined();
    });
  });

  describe("verifySecret", () => {
    it("should return true if password is correct", async () => {
      const password = "myPassword";
      const encodedPassword = await hashSecret(password);

      const isValidPassword = await verifySecret(password, encodedPassword);
      expect(isValidPassword).toBe(true);
    });

    it("should return false if password is wrong", async () => {
      const password = "myPassword";
      const encodedPassword = await hashSecret(password);

      const anotherPassword = "anotherPassword";
      const isInvalidPassword = await verifySecret(
        anotherPassword,
        encodedPassword
      );
      expect(isInvalidPassword).toBe(false);
    });
  });
});
