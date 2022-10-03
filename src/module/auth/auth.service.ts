import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "src/module/users/users.service";
import { isMatchPassword } from "src/utils/hash-password";
import { SignInInput } from "./dto/sign-in.input";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) { }

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findByEmail(email);
		if (user && isMatchPassword(password, user.password)) {
			delete user['password'];
			return user;
		}
		return null;
	}

	async login(signInInput: SignInInput) {
		const { email, password } = signInInput;
		const userInfo = await this.validateUser(email, password);
		const payload = { email: userInfo.email, sub: userInfo._id };
		return {
			access_token: this.jwtService.sign(payload),
			user: userInfo
		};
	}

	verifyToken(access_token: string) {
		return this.jwtService.verifyAsync(access_token);
	}

	async validateRequest(request: any) {
		const token = request.headers.authorization.split(' ')[1];
		const decoded = await this.verifyToken(token);
		return await this.usersService.findByEmail(
			decoded.email
		);
	}
}