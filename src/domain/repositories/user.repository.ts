import { User } from "../entities/User.ts";

export interface UserRepository {
  create(user: User): Promise<User>;
//   findAll(): Promise<User[]>;
//   update(id: number, user: Partial<User>): Promise<User>;
//   deleteById(id: number): Promise<void>;
}