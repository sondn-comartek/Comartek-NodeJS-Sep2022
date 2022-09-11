const {
  signPasswordRandom,
  signToken,
  comparePassword,
  hashPassword,
} = require("../services/userServices");
const User = require("../models/user")
test("should return a string password hashed", async () => {
  const password = "12345678";
  const hash = await hashPassword(password);
  expect(hash).toMatch(/^\$2[ayb]\$.{56}$/); // reg is a string hashed by bcryptjs
});

test("should return a string password with length 8 char", () => {
  const password = signPasswordRandom(8);
  const lengthOfPassword = password.length;
  expect(lengthOfPassword).toEqual(8);
});
test("should return a string signed by jwt", () => {
  const regString = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/;
  const dataTemp = {
    id: 123,
    username: "admin",
  };
  const token = signToken(dataTemp);
  expect(token).toMatch(regString);
});
// test("should return true when password compare", () => {
//   const isMatch = true;
//   const userTemp = {email: "nguyenling", username: "ling", password: "root"}
//   let userSchema = jest.fn()
//   expect(isMatch).toBeTruthy();
// });
