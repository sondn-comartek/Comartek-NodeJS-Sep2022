import * as bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {  
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const isMatchPassword = async (password: string, hashedPassword: string):Promise<boolean>  => {
    return await bcrypt.compare(password, hashedPassword);    
}