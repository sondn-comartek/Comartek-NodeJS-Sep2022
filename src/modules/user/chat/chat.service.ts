import { Injectable } from '@nestjs/common';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';
@Injectable()
export class ChatService {
    constructor(private readonly authService: AuthService) { }

    async getUserFromSocket(socket: Socket) {
        const cookie = socket.handshake.headers.cookie
        const user = await this.authService.getUserFromAuthenticationToken(cookie)
        return user
    }
}