const {
  encryptPassword,
  comparePassword,
} = require("../../src/helpers/password");

describe("encryptPassword helper function", () => {
  describe("When input is a valid string", () => {
    test("should return a hashed password", async () => {
      const password = "example";
      const hashedPassword = await encryptPassword(password);

      console.log({ password, hashedPassword });

      expect(typeof hashedPassword).toBe("string");
      expect(hashedPassword).not.toHaveLength(0);
      expect(hashedPassword.length).toBeGreaterThan(0);
    });
  });

  describe("When input is an empty string or not a string", () => {
    test("should throw an error if input is an empty string or not a string", () => {
      const invalidValuesArray = ["", null, undefined, 1];
      invalidValuesArray.forEach(async (value) => {
        try {
          const hashedPassword = await encryptPassword(value);
          expect(typeof hashedPassword).toBe("string");
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });
});

describe("comparePassword helper function", () => {
  describe("When password is correct", () => {
    test("should return true", async () => {
      const password = "example";
      const correctHashedPassword = await encryptPassword(password);
      const isCorrect = await comparePassword(password, correctHashedPassword);

      expect(typeof isCorrect).toBe("boolean");
      expect(isCorrect).toBe(true);
    });
  });

  describe("When password is incorrect", () => {
    test("should return false if password is incorrect", async () => {
      const password = "example";
      const incorrectHashedPassword = "IncorrectHashedPassword";
      const isCorrect = await comparePassword(
        password,
        incorrectHashedPassword
      );

      expect(typeof isCorrect).toBe("boolean");
      expect(isCorrect).toBe(false);
    });
  });
});
