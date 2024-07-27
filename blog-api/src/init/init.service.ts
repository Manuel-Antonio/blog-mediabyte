import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    const defaultUser = {
      username: 'admin',
      password: 'password',
      roles: ['admin'],
    };

    const existingUser = await this.usersService.findByUsername(
      defaultUser.username,
    );

    if (!existingUser) {
      await this.usersService.create(defaultUser);
      console.log('Usuario por defecto creado');
    } else {
      console.log('El usuario por defecto ya existe');
    }
  }
}
