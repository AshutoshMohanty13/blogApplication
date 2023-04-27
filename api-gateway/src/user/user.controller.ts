import { ClientGrpc, Client } from '@nestjs/microservices';
import { Controller, OnModuleInit } from '@nestjs/common';

import { UserServiceClientOptions } from './user-svc.options';
import { UserServiceInterface } from 'src/_proto/interfaces/user.interface';

@Controller('user')
export class UserController implements OnModuleInit {
  constructor() {}

  @Client(UserServiceClientOptions)
  private readonly userServiceClient: ClientGrpc;

  private userService: any;

  onModuleInit() {
    this.userService =
      this.userServiceClient.getService<UserServiceInterface>('UserService');
  }
}
