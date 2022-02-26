import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserDto } from '../dtos/UserDto';
import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { UserRepository } from '../infra/typeorm/repositories/user.repository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { EntityMapper } from '../utils/EntityMapper';
import { IHashProvider } from '../../auth/providers/HashProvider/interfaces/IHashProvider';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  public async run(userData: CreateUserDto): Promise<UserDto> {
    const hasUser = await this.userRepository.findByEmail(userData.email);

    if (hasUser) {
      throw new AppException('User Already exists!', 409);
    }

    const passwordHashed = await this.hashProvider.generatedHash(userData.password);

    const user = await this.userRepository.register({
      ...userData,
      password: passwordHashed,
    });

    const userDto = EntityMapper.convertToDto(user);

    return userDto;
  }
}
