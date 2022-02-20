import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';

export class UserDto extends OmitType(CreateUserDto, ['password']) {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
