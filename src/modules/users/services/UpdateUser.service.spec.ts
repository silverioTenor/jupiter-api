import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { FakeUserRepository } from '../repositories/fakes/fakeUser.repository';
import { CreateUserService } from './CreateUser.service';
import { UpdateUserService } from './UpdateUser.service';

describe('UpdateUserService', () => {
  let repository: IUserRepository;
  let createUser: CreateUserService;
  let updateUser: UpdateUserService;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    createUser = new CreateUserService(repository);
    updateUser = new UpdateUserService(repository);
  });

  it('should be able update one user', async () => {
    const user = await createUser.run({
      name: 'José',
      lastName: 'Christopher',
      age: 22,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: 'abc1234',
    });

    const updatedUser = await updateUser.run(user.id, { age: 23 } as UpdateUserDto);

    expect(updatedUser).not.toContain('password');
    expect(updatedUser.age).toBe(23);
  });

  it('should not be able to update one user doesnt exist', async () => {
    await expect(
      updateUser.run('', { email: 'primary_test@testing.com' } as UpdateUserDto),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should not be able to update one user with email already exist', async () => {
    await createUser.run({
      name: 'José',
      lastName: 'John Doe',
      age: 29,
      genre: 'man',
      email: 'primary_test@testing.com',
      password: '123abc',
    });

    const user = await createUser.run({
      name: 'José',
      lastName: 'Christopher',
      age: 22,
      genre: 'man',
      email: 'uset_testing@testing.com',
      password: 'abc1234',
    });

    await expect(
      updateUser.run(user.id, { email: 'primary_test@testing.com' } as UpdateUserDto),
    ).rejects.toBeInstanceOf(AppException);
  });
});
