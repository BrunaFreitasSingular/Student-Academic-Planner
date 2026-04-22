import { User } from "../entities/User.ts";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: User["email"]): Promise<User | null>;
  findAll(): Promise<User[]>;
}
