import { Injectable } from '@nestjs/common';

import { ClientGrpc, Client } from '@nestjs/microservices';
import { UserServiceClientOptions } from './user-svc.options';
import { UserServiceInterface } from 'src/_proto/interfaces/user.interface';

@Injectable()
export class User2Service {
  constructor() {}

  @Client(UserServiceClientOptions)
  private readonly userServiceClient: ClientGrpc;

  private userService: any;

  onModuleInit() {
    this.userService =
      this.userServiceClient.getService<UserServiceInterface>('UserService');
  }
}
