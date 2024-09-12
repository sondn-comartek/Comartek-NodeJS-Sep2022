import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { ChatService } from "./chat.service";

@WebSocketGateway()
export class ChatGateWay {
    constructor(
        private readonly chatService: ChatService
    ) {
    }
    @WebSocketServer()
    server

    async handleConnection(socket: Socket) {
        await this.chatService.getUserFromSocket(socket);
    }

    @SubscribeMessage('message')
    async handleMessages(
        @MessageBody() message: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const author = await this.chatService.getUserFromSocket(socket);
        this.server.emit('message', { message, author })
    }
}