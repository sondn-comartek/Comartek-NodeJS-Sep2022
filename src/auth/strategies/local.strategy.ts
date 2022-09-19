import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { CreateLoginRequestDto } from "../dto/create-login-request.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password"
    });
  }

  async validate(email: string, password: string) {
    const createLoginRequestDto: CreateLoginRequestDto = {
      email,
      password
    }

    return await this.authService.login(createLoginRequestDto)
  }
}
