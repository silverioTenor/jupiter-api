import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { UserDto } from '../dtos/userDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { CreateUserService } from './CreateUser.service';
import { GetAllUsersService } from './GetAllUsers.service';

describe('CreateUserService', () => {
  let repository: IUserRepository;
  let createUser: CreateUserService;
  let getUsers: GetAllUsersService;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    createUser = new CreateUserService(repository);
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
    });

    const users = await getUsers.run();

    expect(users).toBeInstanceOf(Array);
    expect(users[0]).toBeInstanceOf(UserDto);
  });
});
