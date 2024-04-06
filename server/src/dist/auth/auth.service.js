"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("../models/user");
let AuthService = class AuthService {
    constructor(jwtService, usersRepository) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async login(nickname) {
        let user = await this.usersRepository.findOne({ where: { nickname } });
        if (!user) {
            user = this.usersRepository.create({ nickname });
            await this.usersRepository.save(user);
        }
        else {
            throw new common_1.ConflictException('Nickname already in use.');
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
    async refreshToken(refresh_token) {
        try {
            const payload = this.jwtService.verify(refresh_token, {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            });
            const user = await this.usersRepository.findOne({
                where: { id: payload.sub },
            });
            if (!user) {
                throw new common_1.ConflictException('User not found.');
            }
            const newPayload = { nickname: user.nickname, sub: user.id };
            const access_token = this.jwtService.sign(newPayload, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                expiresIn: '15m',
            });
            return { access_token };
        }
        catch (error) {
            throw new common_1.ConflictException('Refresh token is invalid or expired.');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map