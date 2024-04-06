import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(nickname: string): Promise<any> {
    // Example user validation logic
    const user = { id: 1, nickname }; // Mocked user
    return user;
  }

  async login(user: any) {
    const payload = { nickname: user.nickname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
