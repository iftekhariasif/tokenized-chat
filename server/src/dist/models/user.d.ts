import { ChatRoom } from './chat-room';
import { Message } from './message';
export declare class User {
    id: number;
    nickname: string;
    chatRooms: ChatRoom[];
    messages: Message[];
}
