import { User } from './user';
import { Message } from './message';
export declare class ChatRoom {
    id: number;
    name: string;
    creator: User;
    messages: Message[];
}
