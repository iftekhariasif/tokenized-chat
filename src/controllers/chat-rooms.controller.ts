import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChatRoomsService } from '../services/chat-rooms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createChatRoom(@Body('name') name: string, @Request() req): Promise<any> {
    return this.chatRoomsService.createChatRoom(name, req.user.userId);
  }

  @Get()
  getAllChatRooms() {
    return this.chatRoomsService.getAllChatRooms();
  }

  @Get(':id')
  getChatRoomById(@Param('id') id: number) {
    return this.chatRoomsService.getChatRoomById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteChatRoom(@Param('id') id: number, @Request() req): Promise<void> {
    return this.chatRoomsService.deleteChatRoom(id, req.user.userId);
  }
}
