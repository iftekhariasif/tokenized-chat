"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_room_1 = require("../models/chat-room");
let ChatRoomsService = class ChatRoomsService {
    constructor(chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }
    async createChatRoom(name, userId) {
        const newChatRoom = this.chatRoomRepository.create({
            name,
            creator: { id: userId },
        });
        await this.chatRoomRepository.save(newChatRoom);
        return newChatRoom;
    }
    async getAllChatRooms() {
        return this.chatRoomRepository.find({ relations: ['creator', 'messages'] });
    }
    async getChatRoomById(id) {
        const chatRoom = await this.chatRoomRepository.findOne({
            where: { id },
            relations: ['creator', 'messages'],
        });
        if (!chatRoom) {
            throw new common_1.NotFoundException(`Chat Room with ID "${id}" not found`);
        }
        return chatRoom;
    }
    async deleteChatRoom(id, userId) {
        const chatRoom = await this.getChatRoomById(id);
        if (chatRoom.creator.id !== userId) {
            throw new common_1.NotFoundException('You are not authorized to delete this chat room');
        }
        await this.chatRoomRepository.delete(id);
    }
};
exports.ChatRoomsService = ChatRoomsService;
exports.ChatRoomsService = ChatRoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_room_1.ChatRoom)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatRoomsService);
//# sourceMappingURL=chat-rooms.service.js.map