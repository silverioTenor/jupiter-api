import { UserDto } from '../dtos/UserDto';
import { User } from '../infra/typeorm/entities/user.entity';
import { CreateUserDto } from '../dtos/CreateUserDto';

export interface IUserRepository {
  findAll(expression?: boolean): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  register(userData: CreateUserDto): Promise<User>;
  updateData(userData: UserDto): Promise<User>;
  removeData(id: string): Promise<void>;
  desactiveAccount(id: string): Promise<void>;
}
