import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createMessage(
    @Body('chatRoomId') chatRoomId: number,
    @Body('content') content: string,
    @Request() req,
  ) {
    return this.messagesService.createMessage(
      req.user.userId,
      chatRoomId,
      content,
    );
  }

  @Get('/:chatRoomId')
  getMessagesByChatRoom(@Param('chatRoomId') chatRoomId: number) {
    return this.messagesService.getMessagesByChatRoom(chatRoomId);
  }

  @Patch('/edit-last')
  @UseGuards(JwtAuthGuard)
  editLastMessage(
    @Body('chatRoomId') chatRoomId: number,
    @Body('newContent') newContent: string,
    @Request() req,
  ) {
    return this.messagesService.editLastMessage(
      req.user.userId,
      chatRoomId,
      newContent,
    );
  }
}
