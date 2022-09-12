import {
  checkPwdIsCorrect,
  modifyUserPwd,
  checkPwdIsSame,
} from "../../src/services/password.service.js";

import { expect, jest, test, describe } from "@jest/globals";


describe("check both pasword is same" , () => {
   
    test("should throw error when current password is null" , () => {
        expect(() => {
            checkPwdIsSame(null , '123123')
        }).toThrowError()
    })
    test("should throw error when new password is null" , () => {
        expect(() => {
            checkPwdIsSame('13123', null )
        }).toThrowError()
    })
    test("should throw error when both password is null" , () => {
        expect(() => {
            checkPwdIsSame()
        }).toThrowError()
    })
    test("should throw error when current password is number" , () => {
        expect(() => {
            checkPwdIsSame(123123, '1231')
        }).toThrowError()
    })
    test("should throw error when new password is number" , () => {
        expect(() => {
            checkPwdIsSame('13123',1231231 )
        }).toThrowError()
    })
    test("should throw error when both password is number" , () => {
        expect(() => {
            checkPwdIsSame(13123,1231231 )
        }).toThrowError()
    })
    test("should throw error when current password is array" , () => {
        expect(() => {
            checkPwdIsSame([], '1231')
        }).toThrowError()
    })
    test("should throw error when new password is array" , () => {
        expect(() => {
            checkPwdIsSame('13123', [] )
        }).toThrowError()
    })
    test("should throw error when both password is array" , () => {
        expect(() => {
            checkPwdIsSame([] ,[])
        }).toThrowError()
    })
    test("should throw error when both password is string by is same" , () => {
        expect(() => {
            checkPwdIsSame('1234' , '1234')
        }).toThrowError()
    })
    test("should return null when both password is string  but is not same" , () => {
        expect(checkPwdIsSame('123' ,'1234')).toBeUndefined()
    })
    
})

describe("check password is correct ", () => {
  test("should throw error when current password unencrypted is null", async () => {
    const pwdUnencrypted = null ;
    const pwdEncrypted = 'abcd' ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
  });
  test("should throw error when current password encrypted is null", async () => {
    const pwdEncrypted = null ;
    const pwdUnencrypted = 'abcd' ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
  });
  test("should throw error when both current password unencrypted and current password encrypted is null", async () => {
    await expect(checkPwdIsCorrect()).rejects.toThrowError()
  });
  test("should throw error when  current password unencrypted is obj", async () => {
    const pwdEncrypted = 'abcd';
    const pwdUnencrypted = {} ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
  });
  test("should throw error when current password encrypted is obj", async () => {
    const pwdEncrypted = {};
    const pwdUnencrypted = 'abcd' ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
  });
  test("should throw error when both current password unencrypted and current password encrypted is obj", async () => {
    const pwdEncrypted = {};
    const pwdUnencrypted = {} ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
    await expect(checkPwdIsCorrect()).rejects.toThrowError()
  });
  test("should throw error when current password unencrypted is number", async () => {
    const pwdEncrypted = 'abcd';
    const pwdUnencrypted = 123 ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
  });
  test("should throw error when current password encrypted is number", async () => {
    const pwdEncrypted = 123;
    const pwdUnencrypted = 'abcd' ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
  });
  test("should throw error when both current password unencrypted and current password encrypted is number", async () => {
    const pwdEncrypted = 123 ;
    const pwdUnencrypted = 123 ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
    await expect(checkPwdIsCorrect()).rejects.toThrowError()
  });
  test("should throw error when both is string and current password unencrypted after decode is not equal current password encrypted ", async () => {
    const pwdUnencrypted = '123456789aA@@' ;
    const pwdEncrypted = 'this is invalid mock password' ;
    await expect(checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)).rejects.toThrowError()
  });
  test("should throw error when both is string and current password unencrypted after decode is equal current password encrypted ", async () => {
    const pwdUnencrypted = '123456789aA@@' ;
    const pwdEncrypted = '$2b$10$Yi0MKJJ97fiNPyL1JDUoy.RCFl.XZhgtaomU4XTeb0Ne3SaMyzCVW' ;
    const result = await checkPwdIsCorrect(pwdUnencrypted,pwdEncrypted)
    expect(result).toBeTruthy()
  });
});
