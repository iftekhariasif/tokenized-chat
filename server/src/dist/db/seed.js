"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const chat_room_1 = require("../models/chat-room");
const message_1 = require("../models/message");
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [user_1.User, chat_room_1.ChatRoom, message_1.Message],
    synchronize: false,
});
async function seed() {
    await dataSource.initialize();
    const userRepository = dataSource.getRepository(user_1.User);
    const chatRoomRepository = dataSource.getRepository(chat_room_1.ChatRoom);
    const messageRepository = dataSource.getRepository(message_1.Message);
    await userRepository.query(`TRUNCATE TABLE "message", "chat_room", "user" RESTART IDENTITY CASCADE;`);
    const users = await userRepository.save([
        { nickname: 'IronMan' },
        { nickname: 'CaptainAmerica' },
        { nickname: 'BlackWidow' },
        { nickname: 'Thor' },
        { nickname: 'Hulk' },
    ]);
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
    const messagesPromises = [];
    for (let i = 1; i <= 100; i++) {
        messagesPromises.push(messageRepository.save({
            content: `Marvel message number ${i}`,
            user: users[i % users.length],
            chatRoom: chatRooms[i % chatRooms.length],
            timestamp: new Date(),
        }));
    }
    await Promise.all(messagesPromises);
    console.log('Seed data successfully inserted.');
    await dataSource.destroy();
}
seed().catch((error) => console.error('Error seeding data:', error));
//# sourceMappingURL=seed.js.map