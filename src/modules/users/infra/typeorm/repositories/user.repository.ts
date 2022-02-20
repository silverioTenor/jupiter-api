import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../../../dtos/createUserDto';
import { UserDto } from '../../../dtos/userDto';
import { IUserRepository } from '../../../interfaces/IUserRepository';
import { User } from '../entities/user.entity';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  private user: User;

  private users: Array<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    this.users = await this.ormRepository.find();
    return this.users;
  }

  public async findById(id: string): Promise<User> {
    this.user = await this.ormRepository.findOne(id);
    return this.user;
  }

  public async findByEmail(email: string): Promise<User> {
    this.user = await this.ormRepository.findOne({ where: { email } });
    return this.user;
  }

  public async create(userData: CreateUserDto): Promise<User> {
    this.user = this.ormRepository.create(userData);
    // await this.ormRepository.save(this.user);

    return this.user;
  }

  public async update(userData: UserDto): Promise<User> {
    this.user = await this.ormRepository.save(userData);
    return this.user;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
