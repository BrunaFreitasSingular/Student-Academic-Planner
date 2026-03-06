import { Course } from "../entities/Course.ts"

export interface CourseRepository{
    create(course: Course):Promise<Course>;
    findAll(): Promise<Course[]>;
}