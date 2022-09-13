const { signup, login, changePassword, forgotPassword, hashPassword, genToken, checkUserEmail } = require('./../src/service/service')



describe('Test service.js', () => {

    describe('Test Hass Password function', () => {

        it('It should return a string', async () => {
            const password = '1234'
            expect(typeof (await hashPassword(password))).toBe('string')
        })

        it('It should return Object Error', async () => {
            const password = 1234
            expect(typeof (await hashPassword(password))).toBe('object')
        })
    })

    describe('Test Gen Token function', () => {
        it('It should return a token', async () => {
            const id = '123'
            expect(typeof (genToken(id))).toBe('string')
        })
    })

    // describe('Test Signup function', () => {
    //     const email = 'test@gmail.com'
    //     const password = '12345678'
    //     const passwordConfirm = '12345678'
    //     const user = jest.fn(checkUserEmail(email)).mockReturnValue({
    //         email: 'test@gmail.com',
    //         password: '12345678',
    //         id:'123'
    //     })
    //     it('User exist', async () =>{
    //         expect(await signup(req,res))
    //     })
    // })

    // describe('Test Login function', () => {

    // })
})
