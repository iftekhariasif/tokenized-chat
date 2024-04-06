import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { ChatRoom } from './models/chat-room';
import { Message } from './models/message';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
