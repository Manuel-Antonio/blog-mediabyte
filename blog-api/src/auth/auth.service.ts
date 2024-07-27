import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user: User = await this.usersService.findByUsername(
      loginDto.username,
    );

    if (user && user.password === loginDto.password) {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new Error('Invalid credentials');
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
    if (!decoded || !decoded.username) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user: User = await this.usersService.findOne(decoded.username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { username: user.username };
    const newToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1h',
    });

    return newToken;
  }
}
