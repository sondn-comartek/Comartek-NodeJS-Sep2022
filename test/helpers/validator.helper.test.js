import {
  validateEmail,
  validatePassword,
} from "../../src/helpers/validator.helper.js";
import { expect, jest, test, describe } from "@jest/globals";

describe("validate email func ", () => {
  test("should throw error when email is null", async () => {
    await expect(validateEmail()).rejects.toThrowError();
  });
  test("should throw error when email is string", async () => {
    await expect(validateEmail("abcdefg")).rejects.toThrowError();
  });
  test("should throw error when email is number", async () => {
    await expect(validateEmail(123123)).rejects.toThrowError();
  });
  test("should throw error when email is empty obj {}", async () => {
    await expect(validateEmail({})).rejects.toThrowError();
  });
  test("should throw error when email is obj", async () => {
    await expect(
      validateEmail({
        abcde: "gmail.com",
      })
    ).rejects.toThrowError();
  });
  test("should throw error when email is string have minDomainSegments < 2", async () => {
    await expect(validateEmail("1.com")).rejects.toThrowError();
  });
  test("should throw error when email is string have minDomainSegments < 2 and tlds is not .com .net", async () => {
    await expect(validateEmail("1@gmail.co")).rejects.toThrowError();
  });
  test("should throw error when  email is string have minDomainSegments > 2 and tlds is not .com .net", async () => {
    await expect(validateEmail("123@gmail.co")).rejects.toThrowError();
  });
  test("should return email is validated when email is email have minDomainSegments > 2 and tlds is .com .net ", async () => {
    const emailUnvalidate = "123@gmail.com";
    const { email } = await validateEmail(emailUnvalidate);
    expect(email).toBe(emailUnvalidate);
  });
});

// Password minimum eight characters,
// at least one uppercase letter, one lowercase letter,
// one number and one special character

describe("validate password func ", () => {
  test("should throw error when password is null", async () => {
    await expect(validatePassword()).rejects.toThrowError();
  });
  test("should throw error when Password is number", async () => {
    await expect(validatePassword(123123)).rejects.toThrowError();
  });
  test("should throw error when Password is empty obj {}", async () => {
    await expect(validatePassword({})).rejects.toThrowError();
  });
  test("should throw error when Password is obj", async () => {
    await expect(
      validatePassword({
        abcde: "gmail.com",
      })
    ).rejects.toThrowError();
  });
  test("should throw error when Password is string have length < 8 ", async () => {
    await expect(validatePassword("abdefgd")).rejects.toThrowError();
  });
  test("should throw error when password is string have length > 8 ", async () => {
    await expect(validatePassword("abcdfghjkl")).rejects.toThrowError();
  });
  test("should throw error when password is string number" , async () => {
    await expect(validatePassword("123123123")).rejects.toThrowError();
  });
  test("should throw error when password is string special charater" , async () => {
    await expect(validatePassword("!@#!@#!@#!@#")).rejects.toThrowError();
  });
  test("should throw error when password is string uppercase" , async () => {
    await expect(validatePassword("AAAAAAAAAAAAA")).rejects.toThrowError();
  });
  test("should throw error when password is string lowercase" , async () => {
    await expect(validatePassword("aaaaaaaaaaaaaa")).rejects.toThrowError();
  });
  test("should throw error when password is string have length > 8 and have number" , async () => {
    await expect(validatePassword("abcdfghjkl123")).rejects.toThrowError();
  });
  test("should throw error when password is string have length > 8 and have special character" , async () => {
    await expect(validatePassword("abcdfghjkl@")).rejects.toThrowError();
  });
  test("should throw error when password is string have length > 8 and have special character , have number " , async () => {
    await expect(validatePassword("abcdfghjkl@123")).rejects.toThrowError();
  });
  test("should throw error when password is string have length > 8 and have special character , have number , one uppercase and not have lowercase" , async () => {
    await expect(validatePassword("1231@@@@Z@123")).rejects.toThrowError();
  });
  test("should throw error when password is string have length > 8 and have special character , have number , one uppercase and have lowercase" , async () => {
    const passwordUnvalidate = 'abcdfghjklZ@123'
    const { password } = await validatePassword(passwordUnvalidate)
    expect(password).toBe(passwordUnvalidate)
  });
  test("should throw error when password is string have length > 8 and at least one uppercase letter, one lowercase letter, one number and one special character" , async () => {
    const passwordUnvalidate = 'abcdfghjklZZ@@@123'
    const { password } = await validatePassword(passwordUnvalidate)
    expect(password).toBe(passwordUnvalidate)
  });
});
