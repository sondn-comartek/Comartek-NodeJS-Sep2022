import { describe, expect, test } from "@jest/globals";
import { hashPassword, generateToken, isMatchPassword } from "../src/services/UserService";

describe('Test hashPassword function in UserService', () => {
    test('hashPassword function should return a string hashed password', async () => {
        const password = "12345678";
        const hashedPassword = await hashPassword(password);
        expect(typeof hashedPassword).toBe("string");
    });

    test('hashPassword function should return a string if input is empty', async () => {
        const hashedPassword = await hashPassword("");
        expect(typeof hashedPassword).toBe("string");
    });

    test('hashPassword function should throw an error if input is number', async () => {
        try {
            const password = 12345678;
            const hashedPassword = await hashPassword(password);
            expect(typeof hashedPassword).toBe("stirng");
        } catch (error) {
            expect(error instanceof Error);
        }
    });

    test('hashPassword function should throw an error if input is null', async () => {
        try {
            const password = null;
            const hashedPassword = await hashPassword(password);
            expect(typeof hashedPassword).toBe("stirng");
        } catch (error) {
            expect(error instanceof Error);
        }
    });
});

describe('Test genereateToken function in UserService', () => {
    test('generateToken should return an string of token', () => {
        const userId = 1;
        const email = "phuctran@gmail.com";
        const token = generateToken(userId, email);
        expect(typeof token).toBe("string");
    });

    test('generateToken should return a string which has length greater than 10', () => {
        const userId = 1;
        const email = "phuctran@gmail.com";
        const token = generateToken(userId, email);
        expect(token.length).toBeGreaterThan(10);
    });
});

describe('Test isMatchPassword function in UserService', () => {
    test('isMatchPassword should return true if password and confirmPassword is match', () => {
        const password = "12345678"
        const confirmPassword = "12345678";
        const isMatch = isMatchPassword(password, confirmPassword);
        expect(isMatch).toEqual(true);
    });

    test('isMatchPassword should return false if password and confirmPassword is not match', () => {
        const password = "12345678"
        const confirmPassword = "123456";
        const isMatch = isMatchPassword(password, confirmPassword);
        expect(isMatch).toEqual(false);
    });

    test('isMatchPassword should return true if typeof password and confirmPassword is not match but same value', () => {
        const password = 12345678
        const confirmPassword = "12345678";
        const isMatch = isMatchPassword(password, confirmPassword);
        expect(isMatch).toEqual(true);
    });

    test('isMatchPassword should return false if typeof password and confirmPassword is not match, not same value', () => {
        const password = "12345678"
        const confirmPassword = { a: 1 };
        const isMatch = isMatchPassword(password, confirmPassword);
        expect(isMatch).toEqual(false);
    });
});