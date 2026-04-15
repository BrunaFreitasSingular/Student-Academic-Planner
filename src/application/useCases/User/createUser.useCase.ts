import { UserRepository } from "../../../domain/repositories/user.repository.ts";
import { CreateUserDTO } from "../../dtos/User.DTO.ts";
import { User } from "../../../domain/entities/User.ts";
import { hash } from "bcryptjs"; // ou outro

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const password_hash = await hash(data.password, 10);

    const user = User.create({
      email: data.email,
      password_hash,
      provider: "local",
      is_active: true,
    });

    return await this.userRepository.create(user);
  }
}
