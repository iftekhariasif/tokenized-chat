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
import { MessagesService } from './services/messages.service';
import { UsersController } from './controllers/users.controller';
import { ChatRoomsController } from './controllers/chat-rooms.controller';
import { MessagesController } from './controllers/messages.controller';

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
  controllers: [AppController, UsersController, ChatRoomsController, MessagesController],
  providers: [AppService, UsersService, ChatRoomsService, MessagesService],
})
export class AppModule {}
