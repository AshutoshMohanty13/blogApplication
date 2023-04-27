import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('fb_clientID'),
      clientSecret: configService.get('fb_clientSecret'),
      callbackURL: configService.get('fb_callbackURL'),
      profileFields: ['emails', 'name'],
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    console.log(profile, 'fb-profile');

    const user = await this.authService.validateUser({
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      profileImageUrl: profile.profileUrl || '',
      email: 'dummyMail@gmail.com',
      // email: profile.emails[0].value,
    });
    done(null, user);
  }
}
