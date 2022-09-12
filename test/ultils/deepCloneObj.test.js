import deepCloneObj from "../../src/utils/deepCloneObj.js";
import { expect, jest, test, describe } from "@jest/globals";

describe('deep clone obj func' , () => {
    test('should return new empty obj when input is null ', () => {
        const newObj = deepCloneObj()
        expect(newObj).toMatchObject({})
    })
    test('should return new empty obj when input is number ', () => {
        const newObj = deepCloneObj(123123)
        expect(newObj).toBeFalsy()
    })
    test('should return new empty obj when input is string ', () => {
        const newObj = deepCloneObj('123123')
        expect(newObj).toBeFalsy()
    })
    test('should return new empty obj when input is array ', () => {
        const newObj = deepCloneObj([])
        expect(newObj).toBeFalsy()
    })
    test('should return new obj when input is valid obj ', () =>{
        const intitalObj = {
            email : '123'
        } ;
        const newObj = deepCloneObj(intitalObj)
        expect(JSON.stringify(newObj) === JSON.stringify(intitalObj)).toBeTruthy()
        expect(newObj === intitalObj).toBeFalsy()
    })
})