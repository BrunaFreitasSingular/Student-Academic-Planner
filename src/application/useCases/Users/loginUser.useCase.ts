import { UserRepository } from "../../../domain/repositories/users.repository.ts";

export class loginUserUseCase {

  constructor(private userRepository: UserRepository){}

  async execute(name: string){

    const user = await this.userRepository.findByName(name);

    if (!user) {
      throw new Error("Usuario nao encontrado.");
    }

    return user;
  }
}