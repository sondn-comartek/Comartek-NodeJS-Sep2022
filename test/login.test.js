
const loginService = require('../src/service/loginService')
const UserModel = require('../src/model/user');
const bcrypt = require('bcrypt');
const InvalidData = require('../src/exception/invaiddata');

jest.mock('../src/model/user', () => {

  return jest.fn().mockImplementation(() => {
    return {}
  });
})
test('Login service success: expect output is jwt string', async () => {
  try {
    const exampleOutput = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZHVvbmd2YW5naWFuZ2hoYmcxNTJAZ21haWwuY29tIn0sImlhdCI6MTY2Mjk1MTYyNywiZXhwIjoxNjYzMjEwODI3fQ.IGVwlnGpRqn9psvYzmZZR_43upRtlEATKHFeKpIvEns'

    process.env.JWT_KEY = "giangdv@comartek.com"
    const email = 'duongvangianghhbg152@gmail.com', password = 'G123456'
    const hashedPassword = await bcrypt.hash(password, 10)
    UserModel.findAll = async (data) =>
      [
        {
          dataValues: {
            email: email,
            password: hashedPassword
          }
        }
      ]

    const jwt = await loginService(email, password)
    expect(typeof jwt).toEqual(typeof "")
    expect(jwt.length).toEqual(exampleOutput.length)
  }
  catch (err) {
    expect(true).toEqual(false)
  }
})

test('Login service fail(invalid email): expect throw invaliddata exception', async () => {
  try {

    process.env.JWT_KEY = "giangdv@comartek.com"
    const email = 'duongvangianghhbg152@gmail.com', password = 'G123456'
    UserModel.findAll = async (data) =>
      [
      ]

      const jwt = await loginService(email + "sdfsd", password)
      if(jwt)
        expect(true).toEqual(false)
      
  }
  catch (err) {
    expect((err instanceof InvalidData === true)).toEqual(true)
  }
})


test('Login service fail(invalid password): expect throw invaliddata exception', async () => {
  try {
    process.env.JWT_KEY = "giangdv@comartek.com"
    const email = 'duongvangianghhbg152@gmail.com', password = 'G123456'
    const hashedPassword = await bcrypt.hash(password, 10)
    UserModel.findAll = async (data) =>
      [
        {
          dataValues: {
            email: email,
            password: hashedPassword
          }
        }
      ]

      const jwt = await loginService(email, password + "213")
      if(jwt)
        expect(true).toEqual(false)
      
  }
  catch (err) {
    expect((err instanceof InvalidData === true)).toEqual(true)
  }
})