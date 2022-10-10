import { Injectable } from '@nestjs/common';
import {} from '@nestjs/websockets';
import { Server } from 'socket.io';

const socket = new Server()

@Injectable()
export class SocketService {}
