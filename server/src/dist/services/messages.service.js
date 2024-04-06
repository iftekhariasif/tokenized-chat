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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_1 = require("../models/message");
const typeorm_3 = require("typeorm");
let MessagesService = class MessagesService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async createMessage(userId, chatRoomId, content) {
        const newMessage = this.messageRepository.create({
            user: { id: userId },
            chatRoom: { id: chatRoomId },
            content,
            timestamp: new Date(),
        });
        await this.messageRepository.save(newMessage);
        return newMessage;
    }
    async getMessagesByChatRoom(chatRoomId) {
        return this.messageRepository.find({
            where: { chatRoom: { id: chatRoomId } },
            relations: ['user', 'chatRoom'],
            order: { timestamp: 'ASC' },
        });
    }
    async editLastMessage(userId, chatRoomId, newContent) {
        const lastMessage = await this.messageRepository.findOne({
            where: {
                chatRoom: { id: chatRoomId },
                user: { id: userId },
            },
            order: { timestamp: 'DESC' },
        });
        if (!lastMessage) {
            throw new Error("You haven't sent any messages in this chat room.");
        }
        const canEdit = await this.canEditMessage(lastMessage.id, chatRoomId);
        if (!canEdit) {
            throw new Error('You can only edit your last message and no new messages should have been sent after it.');
        }
        lastMessage.content = newContent;
        await this.messageRepository.save(lastMessage);
        return lastMessage;
    }
    async canEditMessage(messageId, chatRoomId) {
        const newerMessagesCount = await this.messageRepository.count({
            where: {
                chatRoom: { id: chatRoomId },
                id: (0, typeorm_3.MoreThan)(messageId),
            },
        });
        return newerMessagesCount === 0;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map