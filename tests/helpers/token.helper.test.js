const { createToken } = require("../../src/helpers/token");

describe("createToken helper function", () => {
  test("should return a JWT string", () => {
    const payload = {
      example: "example",
    };
    const token = createToken(payload);
    const tokenTypeRequired = "string";

    expect(typeof token).toBe(tokenTypeRequired);
    expect(token).not.toHaveLength(0);
    expect(token.length).toBeGreaterThan(0);
  });
});
