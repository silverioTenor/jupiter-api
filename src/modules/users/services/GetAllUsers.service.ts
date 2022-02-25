import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "../dtos/userDto";
import { UserRepository } from "../infra/typeorm/repositories/user.repository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { EntityMapper } from "../utils/EntityMapper";

@Injectable()
export class GetAllUsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async run(): Promise<Array<UserDto>> {
    const usersDto = [];
    const users = await this.userRepository.findAll();

    if (users.length > 0) {
      for await (const user of users) {
        const userDto = EntityMapper.convertToDto(user);
        usersDto.push(userDto);
      }
    }

    return usersDto;
  }
}