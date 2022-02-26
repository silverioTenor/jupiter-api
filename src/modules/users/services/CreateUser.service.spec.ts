import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { FakeHashProvider } from '../../auth/providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../../auth/providers/HashProvider/interfaces/IHashProvider';
import { UserDto } from '../dtos/UserDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { CreateUserService } from './CreateUser.service';

describe('CreateUserService', () => {
  let createUser: CreateUserService;
  let repository: IUserRepository;
  let hashProvider: IHashProvider;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(repository, hashProvider);
  });

  it('should be able create one user', async () => {
    const user = await createUser.run({
      name: 'José',
      lastName: 'Christopher',
      age: 22,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: 'abc1234',
    });

    expect(user).not.toContain('password');
    expect(user.email).toBe('uset_testing@testing.com');
    expect(user).toBeInstanceOf(UserDto);
  });

  it('should not be able create one user with same email', async () => {
    await createUser.run({
      name: 'Marcelino',
      lastName: 'Doca',
      age: 20,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: '1234abc',
    });

    await expect(
      createUser.run({
        name: 'José',
        lastName: 'Christopher',
        age: 22,
        genre: 'man',
        email: 'uset_testing@testing.com',
        password: 'abc1234',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
