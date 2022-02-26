import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dtos/SignIn.dto';

@Controller('auth')
export class AuthController {
  @Post()
  signIn(@Body() body: SignInDto) {
    return body;
  }
}
