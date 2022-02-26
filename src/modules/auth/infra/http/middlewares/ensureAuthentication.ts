import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../../../config/auth.config';
import { AppException } from '../../../../../shared/infra/http/exceptions/AppException';
import { ITokenPayload } from '../../../interfaces/ITokenPayload';

export const ensureAuthentication = (request: Request, _: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppException('Invalid credencials', 403);
  }

  const [, token] = authHeader.split(' ');

  const decoded = verify(token, authConfig.jwt.secret);

  const { sub } = decoded as ITokenPayload;

  request.user = { id: sub };

  return next();
};
