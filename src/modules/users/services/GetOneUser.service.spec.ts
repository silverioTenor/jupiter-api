import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { FakeHashProvider } from '../../auth/providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../../auth/providers/HashProvider/interfaces/IHashProvider';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { CreateUserService } from './CreateUser.service';
import { GetOneUserService } from './GetOneUser.service';

describe('GetOneUserService', () => {
  let repository: IUserRepository;
  let hashProvider: IHashProvider;
  let createUser: CreateUserService;
  let getUser: GetOneUserService;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(repository, hashProvider);
    getUser = new GetOneUserService(repository);
  });

  it('should be able get one user', async () => {
    const newUser = await createUser.run({
      name: 'José',
      lastName: 'Christopher',
      age: 22,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: 'abc1234',
    });

    const user = await getUser.run(newUser.id);

    expect(user).not.toBeNull();
  });

  it('should not be able get user', async () => {
    await expect(getUser.run('')).rejects.toBeInstanceOf(AppException);
  });
});
