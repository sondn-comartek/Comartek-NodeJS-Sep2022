  

const UserModel = require('../src/model/user');

const requireResetPasswordService = require('../src/service/requireResetPasswordService');


jest.mock('../src/config/emailSender')

jest.mock('../src/model/user', () => {

  return jest.fn().mockImplementation(() => {
    return {}
  });
})

test('Require reset password: scuccess', async () => {
  try {
    process.env.JWT_KEY = "giangdv@comartek.com"
    process.env.SERVER_HOST = "http://localhost:3000"
    const emailSender = require('../src/config/emailSender')
    emailSender.mockResolvedValue(1)
    UserModel.findAll = async (data) =>
      [
        {
          dataValues: {
            email: 'duongvangianghhbg152@gmail.com',
            password: "hashedPassword"
          }
        }
      ]
    process.env.JWT_KEY = "giangdv@comartek.com"
    process.env.SERVER_HOST = "http://localhost:3000"
    const email = 'duongvangianghhbg152@gmail.com'
    const isSendingSucess = await requireResetPasswordService(email)
    if(!isSendingSucess) 
      expect(true).toEqual(false)
    expect(true).toEqual(true)
  }
  catch (err) {
    console.log(err)
    expect(true).toEqual(false)
  }
})

test('Require reset password: fail', async () => {
  try {

    process.env.JWT_KEY = "giangdv@comartek.com"
    process.env.SERVER_HOST = "http://localhost:3000"
    const email = 'duongvangianghhbg152@gmail.com'
    const isSendingSucess = await requireResetPasswordService(email)
    if(!isSendingSucess) 
      expect(true).toEqual(false)
    expect(true).toEqual(true)
  }
  catch (err) {

    expect(true).toEqual(false)
  }
})