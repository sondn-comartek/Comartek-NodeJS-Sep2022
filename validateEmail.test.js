const validateMail=require(`./utils/validateMail`)
const mailTrue="tuan.nm204700@sis.hust.edu.vn"
const mailFalse1="@tuan.nm204700"
const mailFalse2="tuan.nm204700"
const mailNull=null
const mailObject={tuan:"tuannm@sis.hust.edu.vn"}
const mailNumber=34536
describe(`check validate email`,()=>{
    test(`expect array`,()=>
        expect(validateMail(mailTrue).length).toBeGreaterThan(0))
    test(`expect null`,()=>
        expect(validateMail(mailFalse1)).toBeNull())
    test(`expect null`,()=>
        expect(validateMail(mailFalse2)).toBeNull())
    test(`expect null`,()=>
        expect((validateMail(mailNull))).toBeNull())
    test(`expect null`,()=>
        expect(validateMail(mailObject)).toBeNull())
    test(`expect null`,()=>
        expect(validateMail(mailNumber)).toBeNull())
})