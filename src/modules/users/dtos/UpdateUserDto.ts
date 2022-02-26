import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUserDto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {
  id: string;
}
