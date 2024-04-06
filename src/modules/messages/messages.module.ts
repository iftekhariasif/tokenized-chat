import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from '../../services/messages.service';
import { MessagesController } from '../../controllers/messages.controller';
import { Message } from '../../models/message';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
