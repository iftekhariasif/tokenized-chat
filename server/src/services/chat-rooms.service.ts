import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from '../models/chat-room';

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
  ) {}

  async createChatRoom(name: string, userId: number): Promise<ChatRoom> {
    const newChatRoom = this.chatRoomRepository.create({
      name,
      creator: { id: userId },
    });
    await this.chatRoomRepository.save(newChatRoom);
    return newChatRoom;
  }

  async getAllChatRooms(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({ relations: ['creator', 'messages'] });
  }

  async getChatRoomById(id: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id },
      relations: ['creator', 'messages'],
    });
    if (!chatRoom) {
      throw new NotFoundException(`Chat Room with ID "${id}" not found`);
    }
    return chatRoom;
  }

  async deleteChatRoom(id: number, userId: number): Promise<void> {
    const chatRoom = await this.getChatRoomById(id);
    if (chatRoom.creator.id !== userId) {
      throw new NotFoundException(
        'You are not authorized to delete this chat room',
      );
    }
    await this.chatRoomRepository.delete(id);
  }
}
