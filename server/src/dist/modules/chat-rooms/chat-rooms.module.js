"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chat_room_1 = require("../../models/chat-room");
const chat_rooms_service_1 = require("../../services/chat-rooms.service");
const chat_rooms_controller_1 = require("../../controllers/chat-rooms.controller");
let ChatRoomsModule = class ChatRoomsModule {
};
exports.ChatRoomsModule = ChatRoomsModule;
exports.ChatRoomsModule = ChatRoomsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chat_room_1.ChatRoom])],
        providers: [chat_rooms_service_1.ChatRoomsService],
        controllers: [chat_rooms_controller_1.ChatRoomsController],
    })
], ChatRoomsModule);
//# sourceMappingURL=chat-rooms.module.js.map