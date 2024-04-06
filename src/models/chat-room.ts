import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Message } from './message';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.chatRooms)
  creator: User;

  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[];
}
