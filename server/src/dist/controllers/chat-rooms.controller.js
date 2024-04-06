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
exports.ChatRoomsController = void 0;
const common_1 = require("@nestjs/common");
const chat_rooms_service_1 = require("../services/chat-rooms.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ChatRoomsController = class ChatRoomsController {
    constructor(chatRoomsService) {
        this.chatRoomsService = chatRoomsService;
    }
    createChatRoom(name, req) {
        return this.chatRoomsService.createChatRoom(name, req.user.userId);
    }
    getAllChatRooms() {
        return this.chatRoomsService.getAllChatRooms();
    }
    getChatRoomById(id) {
        return this.chatRoomsService.getChatRoomById(id);
    }
    deleteChatRoom(id, req) {
        return this.chatRoomsService.deleteChatRoom(id, req.user.userId);
    }
};
exports.ChatRoomsController = ChatRoomsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChatRoomsController.prototype, "createChatRoom", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatRoomsController.prototype, "getAllChatRooms", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatRoomsController.prototype, "getChatRoomById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ChatRoomsController.prototype, "deleteChatRoom", null);
exports.ChatRoomsController = ChatRoomsController = __decorate([
    (0, common_1.Controller)('chat-rooms'),
    __metadata("design:paramtypes", [chat_rooms_service_1.ChatRoomsService])
], ChatRoomsController);
//# sourceMappingURL=chat-rooms.controller.js.map