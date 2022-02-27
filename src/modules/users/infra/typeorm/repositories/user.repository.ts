import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../../../dtos/CreateUserDto';
import { UserDto } from '../../../dtos/UserDto';
import { IUserRepository } from '../../../interfaces/IUserRepository';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {
  private ormRepository: Repository<User>;

  private user: User;

  private users: Array<User>;

  constructor() {
    super();
    this.ormRepository = getRepository(User);
  }

  public async findAll(expression: boolean): Promise<User[]> {
    if (!expression) {
      this.users = await this.ormRepository.find({ where: { isActive: true } });
    } else {
      this.users = await this.ormRepository.find();
    }
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

  public async register(userData: CreateUserDto): Promise<User> {
    this.user = this.ormRepository.create(userData);
    await this.ormRepository.save(this.user);

    return this.user;
  }

  public async updateData(userData: UserDto): Promise<User> {
    this.user = await this.ormRepository.save(userData);
    return this.user;
  }

  public async removeData(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async desactiveAccount(id: string): Promise<void> {
    await this.ormRepository.save({ id, isActive: false } as User);
  }
}
