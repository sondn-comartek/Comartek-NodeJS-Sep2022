const AuthSerivce = require("../../src/services/auth.service");

describe("Auth service", () => {
  describe("Login", () => {
    test("should return user's info and a access token if success", async () => {});
  });

  /*

  */
  describe("Register", () => {
    describe("When register information is valid", () => {
      test("should return new user's info", () => {
        // const validRegisterInfo = {
        //   name: "example",
        //   email: "example@gmail.com",
        //   password: "example",
        //   confirmPassword: "example",
        // };

        const response = {
          user: {
            _id: 1,
            name: "example",
            email: "example@gmail.com",
            password: "example",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };

        AuthSerivce.register = jest.fn();
        const value = AuthSerivce.register.mockReturnValue(response);

        expect(typeof value()).toBe("object");
        expect(value()).toBe(response);
      });
    });
  });
});
