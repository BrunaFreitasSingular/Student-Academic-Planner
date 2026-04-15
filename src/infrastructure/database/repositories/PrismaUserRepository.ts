import { prisma } from "../prismaClient.js";
import { User } from "../../../domain/entities/User.ts";
import { UserRepository } from "../../../domain/repositories/user.repository.ts";

export class PrismaUserRepository implements UserRepository {

  async create(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        email: user.email,
        password_hash: user.password_hash,
        provider: user.provider,
        is_active: user.is_active,
        created_at: user.created_at
      }
    });

    return User.restore({
      id: created.id,
      email: created.email,
      password_hash: created.password_hash,
      provider: created.provider,
      is_active: created.is_active,
      created_at: created.created_at
    });
  }
}
