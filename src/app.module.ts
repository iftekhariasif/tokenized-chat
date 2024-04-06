import { config } from 'dotenv';
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
import { ChatGateway } from './gateways/chat.gateway';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, ChatRoom, Message],
      synchronize: true, // NOTE: Set to false in production
    }),
    UsersModule,
    ChatRoomsModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ChatRoomsController,
    MessagesController,
    AuthController,
  ],
  providers: [
    AppService,
    UsersService,
    ChatRoomsService,
    MessagesService,
    ChatGateway,
    AuthService,
  ],
})
export class AppModule {}
