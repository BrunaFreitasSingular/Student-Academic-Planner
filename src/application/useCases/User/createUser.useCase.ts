import { User } from "../../../domain/entities/User.ts";
import type { UserRepository } from "../../../domain/repositories/user.repository.ts";
import type { PasswordHasher } from "../../../domain/services/PasswordHasher.ts";

export type CreateUserDTO = {
  email: string;
  password: string;
  provider?: string;
};

export type CreateUserResponseDTO = {
  id: string;
  email: string;
};

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email já cadastrado");
    }

    const password_hash = await this.passwordHasher.hash(data.password);

    const user = User.create({
      email: data.email,
      password_hash,
      provider: data.provider ?? "local",
      is_active: true,
    });

    const created = await this.userRepository.create(user);

    return {
      id: created.id!,
      email: created.email,
    };
  }
}
