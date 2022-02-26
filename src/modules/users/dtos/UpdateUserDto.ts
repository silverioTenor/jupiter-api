import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createUserDto";

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {
  id: string;
}
