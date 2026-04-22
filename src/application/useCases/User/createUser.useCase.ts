import bcrypt from 'bcryptjs'
import { UserRepository } from "../../../domain/repositories/user.repository.ts"
import { User } from "../../../domain/entities/User.ts"

export type CreateUserDTO = {
  email:    string
  password: string
  provider?: string
}

export type CreateUserResponseDTO = {
  id:    string
  email: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    // 1. verifica se email já existe
    const existing = await this.userRepository.findByEmail(data.email)
    if (existing) {
      throw new Error('Email já cadastrado')
    }

    // 2. gera o hash da senha
    const password_hash = await bcrypt.hash(data.password, 10)

    // 3. cria a entidade
    const user = User.create({
        email:         data.email,
        password_hash: password_hash,
        provider:      data.provider ?? 'local',
        is_active:     true,
    })

    // 4. persiste
    const created = await this.userRepository.create(user)

    // 5. retorna DTO — sem password_hash
    return {
      id:    created.id!,
      email: created.email,
    }
  }
}