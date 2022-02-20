import { UserDto } from '../dtos/userDto';
import { User } from '../infra/typeorm/entities/user.entity';
import { CreateUserDto } from './../dtos/createUserDto';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(userData: CreateUserDto): Promise<User>;
  update(userData: UserDto): Promise<User>;
  delete(id: string): Promise<void>;
}
