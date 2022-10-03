import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/modules/user/model/user.model";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) { }

    async getToken(user: User) {
        const payload = { id: user.id, role: user.role }
        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    }
}
