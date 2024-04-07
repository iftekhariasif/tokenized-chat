import { config } from 'dotenv';
config(); // Ensure environment variables are read

import { DataSource } from 'typeorm';
import { User } from '../models/user';
import { ChatRoom } from '../models/chat-room';
import { Message } from '../models/message';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, ChatRoom, Message],
  synchronize: false,
});

async function clean() {
  await dataSource.initialize();
  const userRepository = dataSource.getRepository(User);
  // const chatRoomRepository = dataSource.getRepository(ChatRoom);
  // const messageRepository = dataSource.getRepository(Message);

  // Clear existing data
  await userRepository.query(
    `TRUNCATE TABLE "message", "chat_room", "user" RESTART IDENTITY CASCADE;`,
  );

  console.log('Database successfully cleaned.');
  await dataSource.destroy();
}

clean().catch((error) => console.error('Error cleaning data:', error));
