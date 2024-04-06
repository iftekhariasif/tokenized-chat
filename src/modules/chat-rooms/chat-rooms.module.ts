import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../../models/chat-room';
import { ChatRoomsService } from '../../services/chat-rooms.service';
import { ChatRoomsController } from '../../controllers/chat-rooms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])], // Register ChatRoom entity
  providers: [ChatRoomsService], // Register ChatRoomsService
  controllers: [ChatRoomsController], // Register ChatRoomsController
})
export class ChatRoomsModule {}
