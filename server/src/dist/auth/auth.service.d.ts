import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../models/user';
export declare class AuthService {
    private jwtService;
    private usersRepository;
    constructor(jwtService: JwtService, usersRepository: Repository<User>);
    login(nickname: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refresh_token: string): Promise<{
        access_token: string;
    }>;
}
