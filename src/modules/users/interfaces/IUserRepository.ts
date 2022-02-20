import { UserDto } from '../dtos/userDto';
import { User } from '../infra/typeorm/entities/user.entity';
import { CreateUserDto } from './../dtos/createUserDto';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  register(userData: CreateUserDto): Promise<User>;
  updateData(userData: UserDto): Promise<User>;
  removeData(id: string): Promise<void>;
}
