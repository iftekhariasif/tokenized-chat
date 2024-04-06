import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
