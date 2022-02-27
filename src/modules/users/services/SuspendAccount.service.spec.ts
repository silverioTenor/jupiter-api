import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { FakeHashProvider } from '../../auth/providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../../auth/providers/HashProvider/interfaces/IHashProvider';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { CreateUserService } from './createUser.service';
import { GetOneUserService } from './GetOneUser.service';
import { SuspendAccount } from './SuspendAccount.service';

describe('SuspendAccount', () => {
  let repository: IUserRepository;
  let hashProvider: IHashProvider;
  let createUser: CreateUserService;
  let getUser: GetOneUserService;
  let suspendAccount: SuspendAccount;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(repository, hashProvider);
    getUser = new GetOneUserService(repository);
    suspendAccount = new SuspendAccount(repository);
  });

  it('should be able suspend one account', async () => {
    const user = await createUser.run({
      name: 'José',
      lastName: 'Christopher',
      age: 22,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: 'abc1234',
    } as CreateUserDto);

    await suspendAccount.run(user.id);

    await expect(getUser.run(user.id)).rejects.toBeInstanceOf(AppException);
  });
});
