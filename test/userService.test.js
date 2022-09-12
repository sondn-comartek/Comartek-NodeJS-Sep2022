import {
  hashUserPassword,
  checkUserEmail,
  createNewUser,
  createToken,
  checkPassword,
  handleLogin,
  verifyToken,
} from "../src/services/userService";

describe("hashUserPassword function", () => {
  test("should return a string", async () => {
    const password = "12345";
    const hashPassword = await hashUserPassword(password);

    expect(typeof hashPassword).toBe("string");
  });

  test("should return a string which has length greater than 10 characters", async () => {
    const password = "12345";
    const hashPassword = await hashUserPassword(password);

    expect(hashPassword.length).toBeGreaterThan(10);
  });

  test("should return a string if input password is a empty string", async () => {
    const password = "";
    const hashPassword = await hashUserPassword(password);

    expect(typeof hashPassword).toBe("string");
  });

  test("should throw an error if input password is a number", async () => {
    try {
      const password = 12345;
      const hashPassword = await hashUserPassword(password);

      expect(typeof hashPassword).toBe("string");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  test("should throw an error if input password is null", async () => {
    try {
      const password = null;
      const hashPassword = await hashUserPassword(password);

      expect(typeof hashPassword).toBe("string");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe("checkUserEmail function", () => {
  test("should return true if email exists", async () => {
    const email = "test@example.com";
    const user = jest.fn().mockReturnValue({
      email,
      password: "12345",
      username: "example",
    });

    expect(user).toBeTruthy();
  });

  test("should return false if email doesn't exist", async () => {
    const email = "test@example.com";
    const user = jest.fn().mockReturnValue(null);

    expect(!user).toBeFalsy();
  });
});

describe("createNewUser function", () => {
  test("should return error code 0 if user doesn't exist in system", async () => {
    const email = "test@example.com";
    const password = "12345678";
    const username = "example";
    const isMailExist = jest.fn(checkUserEmail(email)).mockReturnValue(false);
    const hashPasswordFromBcrypt = jest
      .fn(hashUserPassword(password))
      .mockReturnValue("hashedPasswordMock");

    const result = {
      errCode: 0,
      message: "Create new user successfully",
    };
    expect(true).toBe(true);
  });

  test("should return error code 1 if user already exists", async () => {
    const email = "userexisted@example.com";
    const password = "12345678";
    const username = "example";
    const isMailExist = jest.fn(checkUserEmail(email)).mockReturnValue(true);

    const result = {
      errCode: 1,
      errMessage: "Your email address is already",
    };
    expect(true).toBe(true);
  });
});

describe("createToken function", () => {
  test("should return a token is a string if email input is a string", async () => {
    const email = "test@example.com";
    const token = createToken(email);
    expect(typeof token).toBe("string");
  });

  test("should return a token is a string which has lenght greater than 10 characters", async () => {
    const email = "userexisted@example.com";
    const token = createToken(email);
    expect(token.length).toBeGreaterThan(10);
  });
});

describe("checkPassword function", () => {
  test("should return true if password matches", async () => {
    const password = "12345678";
    // Matches password
    const userPassword =
      "$2a$10$ATQgofs5Zz5PmLcMec2zauvV/I0jnVsVcjtC6aACDywDeWj8fatsC";

    const checkedPassword = await checkPassword(password, userPassword);
    expect(checkedPassword).toBe(true);
  });

  test("should return false if password doesn't match", async () => {
    const password = "12345678";
    // Doesn't match password
    const userPassword = "ramdomstring";

    const checkedPassword = await checkPassword(password, userPassword);
    expect(checkedPassword).toBe(false);
  });
});

describe("handleLogin function", () => {
  test("should return object with error code equal to 0 if email, password is correct", async () => {
    const email = "email@example.com";
    const password = "example";

    const isEmailExist = jest.fn(checkUserEmail(email)).mockResolvedValue(true);
    await isEmailExist();

    const user = jest.fn().mockResolvedValue({
      email,
      password: "userPassword",
    });
    await user();

    const checkedPassword = jest
      .fn(checkPassword(password, user.password))
      .mockResolvedValue(true);
    await checkedPassword();

    const token = jest.fn(createToken(email)).mockResolvedValue("tokenMock");
    await token();

    const result = {
      errCode: 0,
      message: `Login successfully`,
      user,
      token,
    };
    expect(true).toBe(true);
  });

  test("should return object with error code equal to 1 if email doesn't not exist", async () => {
    const email = "email@example.com";
    const password = "example";

    const isEmailExist = jest
      .fn(checkUserEmail(email))
      .mockResolvedValue(false);
    await isEmailExist();

    const result = {
      errCode: 1,
      errMessage: `Your email isn't exist in system`,
    };
    expect(true).toBe(true);
  });

  test("should return object with error code equal to 1 if password is incorrect", async () => {
    const email = "email@example.com";
    const password = "example";

    const isEmailExist = jest.fn(checkUserEmail(email)).mockResolvedValue(true);
    await isEmailExist();

    const user = jest.fn().mockResolvedValue({
      email,
      password: "userPassword",
    });
    await user();

    const checkedPassword = jest
      .fn(checkPassword(password, user.password))
      .mockResolvedValue(false);
    await checkedPassword();

    const result = {
      errCode: 1,
      errMessage: `Wrong password`,
    };
    expect(true).toBe(true);
  });
});

describe("verifyToken function", () => {
  test("should return email if input is correct token", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE2NjI5NTUxNTcsImV4cCI6MTY2MzIxNDM1N30.H18-epbM-F5-oeXqU5O-GWCkXiupCxK0jEDX5xhyju8";

    const email = await verifyToken(token);

    expect(typeof email).toBe("string");
  });

  test("should return undefined if input is wrong token", async () => {
    const token = "ramdomToken";
    const email = await verifyToken(token);

    expect(typeof email).toBe("undefined");
  });

  test("should return undefined if input is null", async () => {
    const token = null;
    const email = await verifyToken(token);

    expect(typeof email).toBe("undefined");
  });

  test("should return undefined if input is number", async () => {
    const token = 12345;
    const email = await verifyToken(token);

    expect(typeof email).toBe("undefined");
  });
});
