import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../models/message';
import { MoreThan } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createMessage(
    userId: number,
    chatRoomId: number,
    content: string,
  ): Promise<Message> {
    const newMessage = this.messageRepository.create({
      user: { id: userId },
      chatRoom: { id: chatRoomId },
      content,
      timestamp: new Date(), // Set the current timestamp
    });

    await this.messageRepository.save(newMessage);
    return newMessage;
  }

  async getMessagesByChatRoom(chatRoomId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { chatRoom: { id: chatRoomId } },
      relations: ['user', 'chatRoom'],
      order: { timestamp: 'ASC' }, // Assuming you want the oldest messages first
    });
  }

  async editLastMessage(
    userId: number,
    chatRoomId: number,
    newContent: string,
  ): Promise<Message> {
    // Find the last message sent by the user in the chat room
    const lastMessage = await this.messageRepository.findOne({
      where: {
        chatRoom: { id: chatRoomId },
        user: { id: userId },
      },
      order: { timestamp: 'DESC' },
    });

    if (!lastMessage) {
      throw new Error("You haven't sent any messages in this chat room.");
    }

    // Check if the message to be edited is indeed the last message
    const canEdit = await this.canEditMessage(lastMessage.id, chatRoomId);

    if (!canEdit) {
      throw new Error(
        'You can only edit your last message and no new messages should have been sent after it.',
      );
    }

    lastMessage.content = newContent;
    await this.messageRepository.save(lastMessage);

    return lastMessage;
  }

  private async canEditMessage(
    messageId: number,
    chatRoomId: number,
  ): Promise<boolean> {
    const newerMessagesCount = await this.messageRepository.count({
      where: {
        chatRoom: { id: chatRoomId },
        id: MoreThan(messageId),
      },
    });

    return newerMessagesCount === 0;
  }
}
