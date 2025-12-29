import jwt from 'jsonwebtoken';
import { config } from '../../../../core/config';

export const jwtService = {
  sign: (payload: string | object) => {
    // cast to the types expected by jsonwebtoken to satisfy TypeScript overloads
    return jwt.sign(payload as any, config.jwt.secret as jwt.Secret, {
      expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
    });
  },
  verify: (token: string) => {
    return jwt.verify(token, config.jwt.secret as jwt.Secret) as any;
  },
};
