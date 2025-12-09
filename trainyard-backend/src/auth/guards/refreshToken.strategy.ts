import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { jwtConstants } from '../auth.constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractRefreshJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refresh_secret,
      passReqToCallback: true,
    });
  }

  async validate(req: RequestType, payload: any) {
    const refreshToken = req.body.refreshToken;
    return { ...payload, refreshToken };
  }

  private static extractRefreshJWT(req: RequestType): string | null {
    if (req.body && req.body.refreshToken) {
      return req.body.refreshToken;
    }
    return null;
  }
}
