import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppException } from "../../../shared/infra/http/exceptions/AppException";
import { UserDto } from "../dtos/userDto";
import { UserRepository } from "../infra/typeorm/repositories/user.repository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { EntityMapper } from "../utils/EntityMapper";

@Injectable()
export class GetOneUserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async run(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppException('User not found', 404);
    }

    const userDto = EntityMapper.convertToDto(user);
    
    return userDto;
  }
}