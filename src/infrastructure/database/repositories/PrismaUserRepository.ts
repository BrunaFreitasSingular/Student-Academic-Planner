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
        created_at: user.created_at,
      },
    });

    return User.restore({
      id: created.id,
      email: created.email,
      password_hash: created.password_hash,
      provider: created.provider,
      is_active: created.is_active,
      created_at: created.created_at,
    });
  }

  async findByEmail(email: User["email"]): Promise<User | null> {
    const found = await prisma.user.findUnique({
      where: { email },
    })
    if(!found) return null;

    return User.restore({
      id: found.id,
      email: found.email,
      password_hash: found.password_hash,
      provider: found.provider,
      is_active: found.is_active,
      created_at: found.created_at,
    });
  }
  
  async findAll(): Promise<User[]> {
  const users = await prisma.user.findMany()
  return users.map((u) =>
    User.restore({
      id:            u.id,
      email:         u.email,
      password_hash: u.password_hash,
      provider:      u.provider,
      is_active:     u.is_active,
      created_at:    u.created_at,
    })
  )
}
}
