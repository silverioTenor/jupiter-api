import { CreateUserDto } from '../../dtos/CreateUserDto';
import { UserDto } from '../../dtos/UserDto';
import { User } from '../../infra/typeorm/entities/user.entity';
import { IUserRepository } from '../../interfaces/IUserRepository';

import { v4 as uuid } from 'uuid';

export class FakeUserRepository implements IUserRepository {
  private user: User;

  private users: Array<User>;

  constructor() {
    this.user = new User();
    this.users = [];
  }

  public async findAll(): Promise<User[]> {
    this.users.push(this.user);
    this.users = this.users.map(_user => {
      return _user.isActive ? _user : null;
    });

    return this.users;
  }

  public async findById(id: string): Promise<User> {
    this.user = this.users.find(_user => _user.id === id && _user.isActive);
    return this.user;
  }

  public async findByEmail(email: string): Promise<User> {
    this.user = this.users.find(_user => _user.email === email && _user.isActive);
    return this.user;
  }

  public async register(userData: CreateUserDto): Promise<User> {
    this.user = {
      id: uuid(),
      ...userData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(this.user);

    return this.user;
  }

  public async updateData(userData: UserDto): Promise<User> {
    const i = this.users.findIndex(_user => _user.id === userData.id);

    this.user = this.users[i];

    Object.entries(userData).map(value => {
      const key = value[0];
      const content = value[1];

      this.user[key] = content;
    });

    this.users[i] = this.user;

    return this.user;
  }

  public async removeData(id: string): Promise<void> {
    this.users = this.users.filter(_user => _user.id !== id);
  }

  public async desactiveAccount(id: string): Promise<void> {
    this.users.forEach(_user => {
      if (_user.id === id) {
        _user.isActive = false;
      }
    });
  }
}
