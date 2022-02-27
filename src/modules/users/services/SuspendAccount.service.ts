import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppException } from '../../../shared/infra/http/exceptions/AppException';
import { UserRepository } from '../infra/typeorm/repositories/user.repository';
import { IUserRepository } from '../interfaces/IUserRepository';

@Injectable()
export class SuspendAccount {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async run(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppException('User not found!', 404);
    }

    await this.userRepository.desactiveAccount(id);
  }
}
