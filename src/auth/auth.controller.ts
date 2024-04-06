import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('nickname') nickname: string) {
    const user = await this.authService.validateUser(nickname);
    if (!user) {
      return 'User not found';
    }
    return this.authService.login(user);
  }
}
