import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(nickname: string): Promise<User> {
    // Check if user exists in the database
    let user = await this.usersRepository.findOne({ where: { nickname } });

    if (!user) {
      // If not, create a new user entity
      user = this.usersRepository.create({ nickname });
      await this.usersRepository.save(user);
    }

    return user;
  }

  async login(user: any) {
    const payload = { nickname: user.nickname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
