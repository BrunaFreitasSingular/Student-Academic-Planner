import { UserRepository } from "../../../domain/repositories/users.repository.ts";

export class ListUserUseCase {

  constructor(private userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
