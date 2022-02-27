import { FakeHashProvider } from '../../auth/providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../../auth/providers/HashProvider/interfaces/IHashProvider';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserDto } from '../dtos/UserDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { CreateUserService } from './CreateUser.service';
import { GetAllUsersService } from './GetAllUsers.service';

describe('GetAllUsersService', () => {
  let repository: IUserRepository;
  let hashProvider: IHashProvider;
  let createUser: CreateUserService;
  let getUsers: GetAllUsersService;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(repository, hashProvider);
    getUsers = new GetAllUsersService(repository);
  });

  it('should be able get a users list', async () => {
    await createUser.run({
      name: 'José',
      lastName: 'Christopher',
      age: 22,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: 'abc1234',
    } as CreateUserDto);

    const users = await getUsers.run();

    expect(users).toBeInstanceOf(Array);
    expect(users[0]).toBeInstanceOf(UserDto);
  });
});
