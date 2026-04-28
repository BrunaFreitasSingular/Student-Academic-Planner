import type { UserRepository } from "../../../domain/repositories/user.repository.ts";
import type { PasswordHasher } from "../../../domain/services/PasswordHasher.ts";
import type { TokenSigner } from "../../../domain/services/TokenSigner.ts";
import type { LoginUserDTO } from "../../dtos/Login.DTO.ts";

export type LoginResponseDTO = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenSigner: TokenSigner,
  ) {}

  async execute({ email, password }: LoginUserDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.is_active) {
      throw new Error("Credenciais inválidas");
    }

    const valid = await this.passwordHasher.compare(
      password,
      user.password_hash,
    );
    if (!valid) {
      throw new Error("Credenciais inválidas");
    }

    const token = this.tokenSigner.sign({ userId: user.id });

    return {
      token,
      user: {
        id: user.id!,
        email: user.email,
      },
    };
  }
}
