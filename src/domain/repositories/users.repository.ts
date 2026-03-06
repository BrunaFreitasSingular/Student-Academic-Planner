import { User } from "../entities/User.ts"

export interface UserRepository{
    create(user: User): Promise<User>;
    findAll():Promise<User[]>;
    findById(id: number): Promise<User | null>;
}