import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserDto } from '../dtos/UserDto';
import { UserRepository } from '../infra/typeorm/repositories/user.repository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { EntityMapper } from '../utils/EntityMapper';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async run(id: string, userData: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppException('User not found', 404);
    }

    const checkEmail = await this.userRepository.findByEmail(userData.email);

    if (checkEmail && checkEmail.id !== user.id) {
      throw new AppException('Email already used', 401);
    }

    const updateUser = { ...user, ...userData };

    const userDto = EntityMapper.convertToDto(updateUser);

    await this.userRepository.updateData(userDto);

    return userDto;
  }
}
