import {
  Controller,
  Get,
  Header,
  Logger,
  Post,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Users } from './decorator/getUser';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @Header('Access-Control-Allow-Origin', '*')
  googleLogin() {}

  @Redirect('http://127.0.0.1/callback', 302)
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    if (!req.user) {
      return `no user `;
    }
    const token = await this.authService.generateJwt({ id: req.user.id });

    return {
      url: `http://127.0.0.1:5501/callback.html?token=${token}`,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Users() user) {
    return user;
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    // Facebook authentication will redirect to this endpoint
  }

  @Get('facebook/callback')
  @Redirect('http://127.0.0.1/callback', 302)
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req): Promise<any> {
    if (!req.user) {
      return `no user `;
    }
    const token = await this.authService.generateJwt({ id: req.user.id });

    return {
      url: `http://127.0.0.1:5501/callback.html?token=${token}`,
    };
  }
}
