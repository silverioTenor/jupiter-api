import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dtos/SignIn.dto';
import { AuthenticationService } from '../services/Authentication.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post()
  signIn(@Body() body: SignInDto) {
    return this.authService.run(body);
  }
}
