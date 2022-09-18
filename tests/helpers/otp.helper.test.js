const { generateOTP } = require("../../src/helpers/otp");

describe("generateOTP helper function", () => {
  test("should return a valid OTP with 6 characters length", async () => {
    const otp = await generateOTP();

    const otpLengthRequired = 6;
    const otpTypeRequired = "string";
    const regex = /^[a-zA-Z0-9]+$/;

    expect(typeof otp).toBe(otpTypeRequired);
    expect(otp).toHaveLength(otpLengthRequired);
    expect(otp).toMatch(regex);
  });
});
