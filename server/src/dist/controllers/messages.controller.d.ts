import { MessagesService } from '../services/messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    createMessage(chatRoomId: number, content: string, req: any): Promise<import("../models/message").Message>;
    getMessagesByChatRoom(chatRoomId: number): Promise<import("../models/message").Message[]>;
    editLastMessage(chatRoomId: number, newContent: string, req: any): Promise<import("../models/message").Message>;
}
