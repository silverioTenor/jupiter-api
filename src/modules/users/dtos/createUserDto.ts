export class CreateUserDto {
  name: string;
  lastName: string;
  age: number;
  genre: 'man' | 'woman';
  email: string;
  password: string;
}
