import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserDto } from '../dtos/userDto';
import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { UserRepository } from '../infra/typeorm/repositories/user.repository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { EntityMapper } from '../utils/EntityMapper';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async run(userData: CreateUserDto): Promise<UserDto> {
    const hasUser = await this.userRepository.findByEmail(userData.email);

    if (hasUser) {
      throw new AppException('User Already exists!', 409);
    }

    const user = await this.userRepository.register(userData);

    const userDto = EntityMapper.convertToDto(user);

    return userDto;
  }
}
