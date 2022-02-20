import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class UserException extends HttpException {
  constructor(message: string, statusCode = 400) {
    super(message, statusCode);
  }
}
