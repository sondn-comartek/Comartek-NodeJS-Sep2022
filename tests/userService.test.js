import { hashUserPassword, checkUserEmail } from '../src/services/userService';
import db from '../src/models/index';

describe('hashUserPassword function', () => {
    test('should return non-empty string', async () => {
        const password = '12345678';

        const hashedPassword = await hashUserPassword(password);

        expect(typeof hashedPassword).toBe('string');
        expect(hashedPassword.length).toBeGreaterThan(0);
    });

    test('should return non-empty string if password is empty string', async () => {
        const password = '';

        const hashedPassword = await hashUserPassword(password);

        expect(typeof hashedPassword).toBe('string');
        expect(hashedPassword.length).toBeGreaterThan(0);
    });

    test('should return non-empty string if password is not a string', async () => {
        const password = 12345678;

        try {
            const hashedPassword = await hashUserPassword(password);
            expect(hashedPassword instanceof Error).toBe(true);
        } catch {
            expect(true).toBe(false);
        }

        // expect(() => {hashUserPassword(password)}).resolves.toBeInstanceOf(Error);
    });

    test('should return non-empty string if password is not a string', async () => {
        const password = undefined;

        try {
            const hashedPassword = await hashUserPassword(password);
            expect(hashedPassword instanceof Error).toBe(true);
        } catch {
            expect(true).toBe(false);
        }

        // expect(() => { hashUserPassword(password) }).resolves.toBeInstanceOf(Error);
    });
});

describe('checkUserEmail function', () => {
    test('should return true if user exists', async () => {
        const email = 'example@gmail.com';

        db.User.findOne = jest.fn().mockResolvedValue({
            email,
            password: '12345678',
            username: 'example',
        });

        const isValid = await checkUserEmail(email);
        expect(isValid).toBe(true);
    });

    test('should return true if user does not exist', async () => {
        const email = 'example@gmail.com';

        db.User.findOne = jest.fn().mockResolvedValue(null);

        const isValid = await checkUserEmail(email);
        expect(isValid).toBe(false);
    });

    test('should return true if email is empty', async () => {
        const email = '';

        db.User.findOne = jest.fn().mockResolvedValue(null);

        const isValid = await checkUserEmail(email);
        expect(isValid).toBe(false);
    });

    test('should return true if email is number', async () => {
        const email = '';

        db.User.findOne = jest.fn().mockResolvedValue(null);

        const isValid = await checkUserEmail(email);
        expect(isValid).toBe(false);
    });
});
