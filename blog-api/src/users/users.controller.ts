import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @Post('register')
  async register(
    @Body() userDto: { username: string; password: string },
  ): Promise<User> {
    const { username, password } = userDto;

    const userExists = await this.usersService.doesUserExist(username);
    if (userExists) {
      throw new ConflictException('Username already exists');
    }

    const user = new User();
    user.username = username;
    user.password = password;

    return this.usersService.create(user);
  }
}
