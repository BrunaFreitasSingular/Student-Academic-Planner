import bcrypt from "bcryptjs";
import type { PasswordHasher } from "../../domain/services/PasswordHasher.ts";

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private readonly saltRounds: number = 10) {}

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
