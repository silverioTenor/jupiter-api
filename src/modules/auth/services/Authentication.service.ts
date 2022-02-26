import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';

import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import authConfig from '../../../config/auth.config';

import { SignInDto } from '../dtos/SignIn.dto';
import { AuthTokenDto } from '../dtos/AuthToken.dto';
import { IHashProvider } from '../providers/HashProvider/interfaces/IHashProvider';
import { UserRepository } from '../../users/infra/typeorm/repositories/user.repository';
import { IUserRepository } from '../../users/interfaces/IUserRepository';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  public async run({ email, password }: SignInDto): Promise<AuthTokenDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppException('User not found!', 404);
    }

    const passwordsMatch = await this.hashProvider.compareHash(password, user.password);

    if (!passwordsMatch) {
      throw new AppException('Invalid credentials');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { subject: user.id, expiresIn });

    const authToken = {
      token,
      userId: user.id,
    } as AuthTokenDto;

    return authToken;
  }
}
