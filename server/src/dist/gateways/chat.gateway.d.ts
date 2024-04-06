import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleMessage(message: string, client: Socket): void;
}
