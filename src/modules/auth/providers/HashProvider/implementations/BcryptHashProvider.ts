import { hash, compare } from 'bcryptjs';
import { IHashProvider } from '../interfaces/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  public async generatedHash(payload: string): Promise<string> {
    return hash(payload, 10);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
