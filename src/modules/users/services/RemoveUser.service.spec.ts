import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { FakeHashProvider } from '../../auth/providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../../auth/providers/HashProvider/interfaces/IHashProvider';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserDto } from '../dtos/UserDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { CreateUserService } from './createUser.service';
import { GetOneUserService } from './GetOneUser.service';
import { RemoveUserService } from './RemoveUser.service';

describe('RemoveUserService', () => {
  let repository: IUserRepository;
  let hashProvider: IHashProvider;
  let createUser: CreateUserService;
  let getUser: GetOneUserService;
  let removeUser: RemoveUserService;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(repository, hashProvider);
    getUser = new GetOneUserService(repository);
    removeUser = new RemoveUserService(repository);
  });

  it('should be able to remove user by ID', async () => {
    const user = await createUser.run({
      name: 'John Doe',
      lastName: '',
      age: 25,
      email: 'john_doe@testing.com',
      genre: 'man',
      password: 'abc1234',
    } as CreateUserDto);

    await removeUser.run(user.id);

    await expect(getUser.run(user.id)).rejects.toBeInstanceOf(AppException);
  });

  it('should not be able to remove user by invalid ID', async () => {
    const user = await createUser.run({
      name: 'John Doe',
      lastName: '',
      age: 25,
      email: 'john_doe@testing.com',
      genre: 'man',
      password: 'abc1234',
    } as CreateUserDto);

    await expect(removeUser.run(`${user.id}sd`)).rejects.toBeInstanceOf(AppException);
    expect(getUser.run(user.id)).resolves.toBeInstanceOf(UserDto);
  });
});
