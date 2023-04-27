import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { UserServiceClientOptions } from 'src/user/user-svc.options';
import { UserServiceInterface } from 'src/_proto/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  @Client(UserServiceClientOptions)
  private readonly userServiceClient: ClientGrpc;

  private userService: any;

  async onModuleInit() {
    this.userService =
      this.userServiceClient.getService<UserServiceInterface>('UserService');
  }
  logger = new Logger(AuthService.name);

  async validateUser(input: any) {
    try {
      const userId = await this.userService.getUserByEmail(input).toPromise();
      this.logger.log(`validateUser ${userId}`);

      this.logger.log(`validateUser ${input.email}`);
      return { email: input.email, id: userId._id };
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(input: any) {
    return this.userService.getUserById(input).toPromise();
  }

  async generateJwt(payload) {
    return this.jwtService.signAsync(payload);
  }
}
