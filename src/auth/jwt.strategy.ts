import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 提取 token 的方法
      ignoreExpiration: false, // 确保 token 没有过期
      secretOrKey: jwtConstants.secretKey, // 密钥
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
