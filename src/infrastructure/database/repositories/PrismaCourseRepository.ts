import { prisma } from "../../../infrastructure/database/prismaClient.ts"
import { Course } from "../../../domain/entities/Course.ts"
import { CourseRepository } from "../../../domain/repositories/course.repository.ts"

export class PrismaCourseRepository implements CourseRepository{
  async create(course: Course): Promise<Course>{
      const created = await prisma.course.create({
          data: {
              name: course.name,
              requiredCredits: course.requiredCredits,
              transferredCredits: course.transferredCredits,
              electiveCredits: course.electiveCredits,
              complementaryCredits: course.complementaryCredits,
              numberOfComplementaryTypes: course.numberOfComplementaryTypes,
              extensionHours: course.extensionHours
          }
      });
      
      return Course.restore({
        ...created
      });
  }
    
  async findAll(): Promise<Course[]>{
    const course = await prisma.course.findMany();
    return course.map(c => Course.restore({
        id: c.id,
        name: c.name,
        requiredCredits: c.requiredCredits,
        transferredCredits: c.transferredCredits,
        electiveCredits: c.electiveCredits,
        complementaryCredits: c.complementaryCredits,
        numberOfComplementaryTypes: c.numberOfComplementaryTypes,
        extensionHours: c.extensionHours
    }))
  }

  async findById(id: number): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: { id }
    });

    if (!course) return null;

    return Course.restore({
      id: course.id,
      name: course.name,
      requiredCredits: course.requiredCredits,
      transferredCredits: course.transferredCredits,
      electiveCredits: course.electiveCredits,
      complementaryCredits: course.complementaryCredits,
      numberOfComplementaryTypes: course.numberOfComplementaryTypes,
      extensionHours: course.extensionHours
    });
  }
}
