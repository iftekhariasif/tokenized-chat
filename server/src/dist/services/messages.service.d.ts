import { Repository } from 'typeorm';
import { Message } from '../models/message';
export declare class MessagesService {
    private messageRepository;
    constructor(messageRepository: Repository<Message>);
    createMessage(userId: number, chatRoomId: number, content: string): Promise<Message>;
    getMessagesByChatRoom(chatRoomId: number): Promise<Message[]>;
    editLastMessage(userId: number, chatRoomId: number, newContent: string): Promise<Message>;
    private canEditMessage;
}
