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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("../services/messages.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    createMessage(chatRoomId, content, req) {
        return this.messagesService.createMessage(req.user.userId, chatRoomId, content);
    }
    getMessagesByChatRoom(chatRoomId) {
        return this.messagesService.getMessagesByChatRoom(chatRoomId);
    }
    editLastMessage(chatRoomId, newContent, req) {
        return this.messagesService.editLastMessage(req.user.userId, chatRoomId, newContent);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('chatRoomId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)('/:chatRoomId'),
    __param(0, (0, common_1.Param)('chatRoomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getMessagesByChatRoom", null);
__decorate([
    (0, common_1.Patch)('/edit-last'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('chatRoomId')),
    __param(1, (0, common_1.Body)('newContent')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "editLastMessage", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map