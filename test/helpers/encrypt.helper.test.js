import { encryptPwd, comparePwd } from "../../src/helpers/encrypt.helper.js";
import { expect, jest, test, describe } from "@jest/globals";

describe("encrypt password", () => {
  test("should return password encrypted string when unencrypt is empty string ", async () => {
    const UnencryptPwd = "";
    const pwdEncrypted = await encryptPwd(UnencryptPwd);
    expect(typeof pwdEncrypted).toBe("string");
    expect(pwdEncrypted.length).toBeGreaterThan(0);
  });
  test("should return password encrypted string when unencrypt is string", async () => {
    const UnencryptPwd = "abcdssasass";
    const pwdEncrypted = await encryptPwd(UnencryptPwd);
    expect(typeof pwdEncrypted).toBe("string");
    expect(pwdEncrypted.length).toBeGreaterThan(0);
  });
  test("should return password encrypted string when unencrypt is string have number ", async () => {
    const UnencryptPwd = "abcdssasass123";
    const pwdEncrypted = await encryptPwd(UnencryptPwd);
    expect(typeof pwdEncrypted).toBe("string");
    expect(pwdEncrypted.length).toBeGreaterThan(0);
  });
  test("should return password encrypted string when unencrypt is string have number and special character ", async () => {
    const UnencryptPwd = "abcdssasass123@@!";
    const pwdEncrypted = await encryptPwd(UnencryptPwd);
    expect(typeof pwdEncrypted).toBe("string");
    expect(pwdEncrypted.length).toBeGreaterThan(0);
  });
  test("should throw err when unencrypt is number", async () => {
    const UnencryptPwd = 1123;
    await expect(encryptPwd(UnencryptPwd)).rejects.toThrowError();
  });
  test("should throw err when unencrypt is object ", async () => {
    const UnencryptPwd = {};
    await expect(encryptPwd(UnencryptPwd)).rejects.toThrowError();
  });
  test("should throw err when unencrypt is array ", async () => {
    const UnencryptPwd = [];
    await expect(encryptPwd(UnencryptPwd)).rejects.toThrowError();
  });
});

describe("compare password", () => {
    test("should return true when unencrypt password is empty string and equal password encrypted after decode" , async () => {
        const unencryptPwd  = "" ;
        const pwdEncrypted = await encryptPwd(unencryptPwd);
        const result = await comparePwd(unencryptPwd , pwdEncrypted);
        expect(result).toBeTruthy()
    })
    test("should return true when unencrypt password is string and  equal password encrypted after decode" , async () => {
        const unencryptPwd  = "abcdefg" ;
        const pwdEncrypted = await encryptPwd(unencryptPwd);
        const result = await comparePwd(unencryptPwd , pwdEncrypted);
        expect(result).toBeTruthy()
    })
    test("should return true when unencrypt password is string + number and  equal password encrypted after decode" , async () => {
        const unencryptPwd  = "abcdefg123" ;
        const pwdEncrypted = await encryptPwd(unencryptPwd);
        const result = await comparePwd(unencryptPwd , pwdEncrypted);
        expect(result).toBeTruthy()
    })
    test("should return true when unencrypt password is string + number +special charactor and equal password encrypted after decode" , async () => {
        const unencryptPwd  = "abcdefg123@@1" ;
        const pwdEncrypted = await encryptPwd(unencryptPwd);
        const result = await comparePwd(unencryptPwd , pwdEncrypted);
        expect(result).toBeTruthy()
    })
    test("should return false when unencrypt password not equal password encrypted after decode" , async () => {
        const mockPwd  = "abcdefg" ;
        const pwdEncrypted = await encryptPwd(mockPwd);
        const unencryptPwd  = "zxcvbnn" ;
        const result = await comparePwd(unencryptPwd , pwdEncrypted);
        expect(result).toBeFalsy()
    })
    test("should throw err when unencrypt password is number" , async () => {
        const mockPwd  = "abcdefg" ;
        const pwdEncrypted = await encryptPwd(mockPwd);
        const unencryptPwd  = 1234 ;
        await expect(comparePwd(unencryptPwd , pwdEncrypted)).rejects.toThrowError();
    })
    test("should throw err when unencrypt password is obj" , async () => {
        const mockPwd  = "abcdefg" ;
        const pwdEncrypted = await encryptPwd(mockPwd);
        const unencryptPwd  = {} ;
        await expect(comparePwd(unencryptPwd , pwdEncrypted)).rejects.toThrowError();
    })
    test("should throw err when unencrypt password is array" , async () => {
        const mockPwd  = "abcdefg" ;
        const pwdEncrypted = await encryptPwd(mockPwd);
        const unencryptPwd  = [] ;
        await expect(comparePwd(unencryptPwd , pwdEncrypted)).rejects.toThrowError();
    })
})