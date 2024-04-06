import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user'; // Adjust path as necessary

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(
    nickname: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    let user = await this.usersRepository.findOne({ where: { nickname } });

    if (!user) {
      user = this.usersRepository.create({ nickname });
      await this.usersRepository.save(user);
    } else {
      throw new ConflictException('Nickname already in use.');
    }

    const payload = { nickname: user.nickname, sub: user.id };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  async refreshToken(refresh_token: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new ConflictException('User not found.');
      }

      const newPayload = { nickname: user.nickname, sub: user.id };
      const access_token = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: '15m',
      });

      return { access_token };
    } catch (error) {
      throw new ConflictException('Refresh token is invalid or expired.');
    }
  }
}
