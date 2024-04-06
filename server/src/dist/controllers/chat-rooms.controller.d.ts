import { ChatRoomsService } from '../services/chat-rooms.service';
export declare class ChatRoomsController {
    private readonly chatRoomsService;
    constructor(chatRoomsService: ChatRoomsService);
    createChatRoom(name: string, req: any): Promise<import("../models/chat-room").ChatRoom>;
    getAllChatRooms(): Promise<import("../models/chat-room").ChatRoom[]>;
    getChatRoomById(id: number): Promise<import("../models/chat-room").ChatRoom>;
    deleteChatRoom(id: number, req: any): Promise<void>;
}
