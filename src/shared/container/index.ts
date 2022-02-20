import { container } from 'tsyringe';
import { UserRepository } from '../../modules/users/infra/typeorm/repositories/user.repository';
import { IUserRepository } from '../../modules/users/interfaces/IUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
