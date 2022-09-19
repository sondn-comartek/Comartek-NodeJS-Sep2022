import * as mongoose from 'mongoose';
import { Role } from '../roles/role.enum';

export const UserSchema = new mongoose.Schema({
    role: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    city: { type: String, required: true }  
})

export class User {
    role: Role[];
    name: string;
    phone: string;
    email: string;
    hashedPassword: string;
    city: string
}
