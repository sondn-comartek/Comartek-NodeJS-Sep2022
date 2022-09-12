

const UserModel = require('../src/model/user');

const EmailExisted = require('../src/exception/emailexisted');
const registerService = require('../src/service/registerService');



jest.mock('../src/model/user', () => {
  return jest.fn().mockImplementation(() => {
    return {}
  });
})

test('Register service scucess: ', async () => {
  try {
    process.env.JWT_KEY = "giangdv@comartek.com"


    UserModel.findAll = async (data) =>
      [
      ]
    UserModel.create = async (data) => {
      return true
    }
    const isCreatedAccount = await registerService('duongvangianghhbg152@gmail.com', 'G123456')
    if(!isCreatedAccount) 
      expect(true).toEqual(false)
    
    expect(true).toEqual(true)
  }
  catch (err) {
    expect(true).toEqual(false)
  }
})

test('Register service fail: expect throw EmailExisted exception', async () => {
  try {
    process.env.JWT_KEY = "giangdv@comartek.com"


    UserModel.findAll = async (data) =>
      [
        {
          dataValues: {
            email: 'duongvangianghhbg152@gmail.com',
            password: 'G123456'
          }
        }
      ]
    UserModel.create = async (data) => {
      return true
    }
    const isCreatedAccount = await registerService('duongvangianghhbg152@gmail.com', 'G123456')
    if(isCreatedAccount) 
      expect(true).toEqual(false)
    
    
  }
  catch (err) {
    expect(err instanceof EmailExisted)
  }
})


