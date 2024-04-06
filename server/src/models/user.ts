import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChatRoom } from './chat-room';
import { Message } from './message';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.creator)
  chatRooms: ChatRoom[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
