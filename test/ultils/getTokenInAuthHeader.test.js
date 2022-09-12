import getTokenInAuthHeader from "../../src/utils/getTokenInAuthHeader.js";
import { expect, jest, test, describe } from "@jest/globals";


describe('get token in auth header func' , () => {
    test('should return falsy when input is null' , () => {
        expect(getTokenInAuthHeader()).toBeFalsy()
    })
    test('should return falsy when input is number' , () => {
        expect(getTokenInAuthHeader(12312312312)).toBeFalsy()
    })
    test('should return falsy when input is obj' , () => {
        expect(getTokenInAuthHeader({})).toBeFalsy()
    })
    test('should return undefinded when input is linked string' , () => {
        expect(getTokenInAuthHeader('abcddededed')).toBeUndefined()
    })
    test('should return 2nd string when input is string have spaces' , () => {
        expect(getTokenInAuthHeader('abc defghjkl')).toBe('defghjkl')
    })
})