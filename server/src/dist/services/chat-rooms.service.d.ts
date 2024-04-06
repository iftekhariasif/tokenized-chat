import { Repository } from 'typeorm';
import { ChatRoom } from '../models/chat-room';
export declare class ChatRoomsService {
    private readonly chatRoomRepository;
    constructor(chatRoomRepository: Repository<ChatRoom>);
    createChatRoom(name: string, userId: number): Promise<ChatRoom>;
    getAllChatRooms(): Promise<ChatRoom[]>;
    getChatRoomById(id: number): Promise<ChatRoom>;
    deleteChatRoom(id: number, userId: number): Promise<void>;
}
