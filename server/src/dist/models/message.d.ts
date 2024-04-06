import { User } from './user';
import { ChatRoom } from './chat-room';
export declare class Message {
    id: number;
    content: string;
    timestamp: Date;
    user: User;
    chatRoom: ChatRoom;
}
