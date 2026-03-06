import { UserRepository } from "../../../domain/repositories/users.repository.ts";

export class getUserByIdUseCase {

  constructor(private userRepository: UserRepository) {}

  async execute(id: number) {

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}