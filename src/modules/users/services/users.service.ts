import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserDto } from '../dtos/userDto';
import { IUserRepository } from '../interfaces/IUserRepository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepository,
  ) {}

  public async create(userData: CreateUserDto): Promise<UserDto> {
    Object.keys(userData).map(value => {
      if (value.length === 0 || value === '') {
        throw new Error('Please, fill fields!');
      }
    });

    const user = await this.userRepository.create(userData);

    // TODO - convert User to UserDto

    return user;
  }

  public async findAll() {
    return `This action returns all users`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async update(id: number, {}: UserDto) {
    return `This action updates a #${id} user`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
