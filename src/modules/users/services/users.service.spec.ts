import { UserException } from '../infra/http/exceptions/UserException';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let repository: IUserRepository;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    userService = new UsersService(repository);
  });

  it('should be able create one user', async () => {
    const user = await userService.create({
      name: 'José',
      lastName: 'Christopher',
      age: 22,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: 'abc1234',
    });

    expect(user).not.toContain('password');
    expect(user.email).toBe('uset_testing@testing.com');
  });

  it('should not be able create one user with same email', async () => {
    await userService.create({
      name: 'Marcelino',
      lastName: 'Doca',
      age: 20,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: '1234abc',
    });

    await expect(
      userService.create({
        name: 'José',
        lastName: 'Christopher',
        age: 22,
        genre: 'man',
        email: 'uset_testing@testing.com',
        password: 'abc1234',
      }),
    ).rejects.toBeInstanceOf(UserException);
  });
});
