import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createMessage(
    @Body()
    createMessageDto: {
      userId: number;
      chatRoomId: number;
      content: string;
    },
  ) {
    return this.messagesService.createMessage(
      createMessageDto.userId,
      createMessageDto.chatRoomId,
      createMessageDto.content,
    );
  }

  @Get('/:chatRoomId')
  getMessagesByChatRoom(@Param('chatRoomId') chatRoomId: number) {
    return this.messagesService.getMessagesByChatRoom(chatRoomId);
  }

  @Patch('/edit-last')
  @UseGuards(JwtAuthGuard)
  editLastMessage(
    @Body()
    editMessageDto: {
      userId: number;
      chatRoomId: number;
      newContent: string;
    },
  ) {
    return this.messagesService.editLastMessage(
      editMessageDto.userId,
      editMessageDto.chatRoomId,
      editMessageDto.newContent,
    );
  }
}
