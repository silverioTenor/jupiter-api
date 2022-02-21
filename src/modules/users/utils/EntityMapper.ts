import { UserDto } from '../dtos/userDto';
import { User } from '../infra/typeorm/entities/user.entity';

export class EntityMapper {
  static convertToDto(entity: User): UserDto {
    const userDto = new UserDto();

    Object.entries(entity).map(value => {
      const key = value[0];
      const content = value[1];

      if (key !== 'password') {
        userDto[key] = content;
      }
    });

    return userDto;
  }
}