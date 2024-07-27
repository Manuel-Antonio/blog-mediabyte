import { Controller, Post, Body, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    try {
      const newToken = await this.authService.refreshToken(refreshToken);
      return { access_token: newToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
