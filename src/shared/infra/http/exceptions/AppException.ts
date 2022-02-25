import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class AppException extends HttpException {
  constructor(message: string, statusCode = 400) {
    super(message, statusCode);
  }
}
