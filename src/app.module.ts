import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { ChatRoom } from './models/chat-room';
import { Message } from './models/message';
import { UsersModule } from './modules/users/users.module';
import { ChatRoomsModule } from './modules/chat-rooms/chat-rooms.module';
import { MessagesModule } from './modules/messages/messages.module';
import { UsersService } from './services/users.service';
import { ChatRoomsService } from './services/chat-rooms.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'chatadmin',
      password: 'chatpassword',
      database: 'hello-chat',
      entities: [User, ChatRoom, Message],
      synchronize: true, // NOTE: Set to false in production
    }),
    UsersModule,
    ChatRoomsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, ChatRoomsService],
})
export class AppModule {}
