import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserDto } from '../dtos/userDto';
import { UserException } from '../infra/http/exceptions/UserException';
import { UserRepository } from '../infra/typeorm/repositories/user.repository';
import { IUserRepository } from '../interfaces/IUserRepository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async create(userData: CreateUserDto): Promise<UserDto> {
    const hasUser = this.userRepository.findByEmail(userData.email);

    if (hasUser) {
      throw new UserException('User Already exists!', 409);
    }

    const user = await this.userRepository.register(userData);

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
