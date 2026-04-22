import { UserRepository } from "../../../domain/repositories/user.repository.ts";

export type UserResponseDTO = {
  id: string;
  email: string;
  provider: string;
  is_active: boolean;
  created_at: Date;
};

export class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();

    // mapeia para DTO
    return users.map((u) => ({
      id: u.id!,
      email: u.email,
      provider: u.provider,
      is_active: u.is_active,
      created_at: u.created_at,
    }));
  }
}
