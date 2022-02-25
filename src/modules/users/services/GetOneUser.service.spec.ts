import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { CreateUserService } from './CreateUser.service';
import { GetOneUserService } from './GetOneUser.service';

describe('GetOneUserService', () => {
  let repository: IUserRepository;
  let createUser: CreateUserService;
  let getUser: GetOneUserService;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    createUser = new CreateUserService(repository);
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
