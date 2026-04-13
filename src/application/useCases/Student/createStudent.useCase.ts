import { StudentRepository } from "../../../domain/repositories/student.repository.ts";
import { CreateStudentDTO } from "../../dtos/StudentDTO.ts";
import { Student } from "../../../domain/entities/Student.ts"

export class CreateStudentUseCase{
    constructor(private studentRepository: StudentRepository){}

    async execute(data: CreateStudentDTO): Promise<Student>{
        const student = Student.create({
            name: data.name,
            course_id: data.course_id,
            semester: data.semester
        });
        return await this.studentRepository.create(student);
    }
}
