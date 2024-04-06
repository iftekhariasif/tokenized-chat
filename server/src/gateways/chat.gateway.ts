import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('chat')
  @SubscribeMessage('chat')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Message from client ${client.id}: ${message}`);
    this.server.emit('chat', message);
  }
}
