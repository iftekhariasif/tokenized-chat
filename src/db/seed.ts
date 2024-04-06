import { config } from 'dotenv';
config(); // Make sure this is at the very top

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

async function seed() {
  await dataSource.initialize();
  const userRepository = dataSource.getRepository(User);
  const chatRoomRepository = dataSource.getRepository(ChatRoom);
  const messageRepository = dataSource.getRepository(Message);

  // Clear existing data
  await userRepository.query(
    `TRUNCATE TABLE "message", "chat_room", "user" RESTART IDENTITY CASCADE;`,
  );

  // Create and Save Users
  const users = await userRepository.save([
    { nickname: 'IronMan' },
    { nickname: 'CaptainAmerica' },
    { nickname: 'BlackWidow' },
    { nickname: 'Thor' },
    { nickname: 'Hulk' },
  ]);

  // Create and Save Chat Rooms
  const chatRooms = await chatRoomRepository.save([
    { name: 'Avengers Tower', creator: users[0] },
    { name: 'S.H.I.E.L.D. HQ', creator: users[1] },
    { name: 'Asgard', creator: users[2] },
    { name: 'Wakanda', creator: users[3] },
    { name: 'Stark Industries', creator: users[4] },
    { name: 'X-Mansion', creator: users[0] },
    { name: 'The Baxter Building', creator: users[1] },
    { name: 'The Daily Bugle', creator: users[2] },
    { name: 'Sanctum Sanctorum', creator: users[3] },
    { name: 'Knowhere', creator: users[4] },
  ]);

  // Insert 100 Messages
  const messagesPromises = [];
  for (let i = 1; i <= 100; i++) {
    messagesPromises.push(
      messageRepository.save({
        content: `Marvel message number ${i}`,
        user: users[i % users.length],
        chatRoom: chatRooms[i % chatRooms.length],
        timestamp: new Date(),
      }),
    );
  }
  await Promise.all(messagesPromises);

  console.log('Seed data successfully inserted.');
  await dataSource.destroy();
}

seed().catch((error) => console.error('Error seeding data:', error));
