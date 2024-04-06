import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(nickname: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(refresh_token: string): Promise<{
        access_token: string;
    }>;
}
