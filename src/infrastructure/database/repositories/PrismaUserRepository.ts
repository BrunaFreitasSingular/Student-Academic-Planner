import { prisma } from "../prismaClient.ts";
import { User } from "../../../domain/entities/User.ts"
import { UserRepository } from "../../../domain/repositories/users.repository.ts";

export class PrismaUserRepository implements UserRepository{
    async create(user: User): Promise<User>{
        const created = await prisma.user.create({
            data: {
              name: user.name,
              course_id: user.course_id,
              semester: user.semester,
            }
          });
        
          return User.restore({
            id: created.id,
            name: created.name,
            course_id: created.course_id,
            semester: created.semester
          });
    }


    async findAll(): Promise<User[]> {
      const user = await prisma.user.findMany();
      
      return user.map(u => User.restore({
          id: u.id,
          name: u.name,
          course_id: u.course_id,
          semester: u.semester
    })
      );
    }

    async findById(id: number): Promise<User | null> {

      const user = await prisma.user.findUnique({
        where: { id }
      });

      if (!user) return null;

      return User.restore({
        id: user.id,
        name: user.name,
        semester: user.semester,
        course_id: user.course_id
      });
    }
}

