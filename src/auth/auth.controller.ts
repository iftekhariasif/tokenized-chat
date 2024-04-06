import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; // Adjust path as necessary

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('nickname') nickname: string) {
    return this.authService.login(nickname);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refresh_token: string) {
    return this.authService.refreshToken(refresh_token);
  }
}
