import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'chatadmin',
      password: 'chatpassword',
      database: 'hello-chat',
      entities: [],
      synchronize: true, // NOTE: Set to false in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
