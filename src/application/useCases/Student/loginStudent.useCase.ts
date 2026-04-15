import { StudentRepository } from "../../../domain/repositories/student.repository.ts";

export class loginStudentUseCase {

  constructor(private studentRepository: StudentRepository){}

  async execute(name: string){

    const student = await this.studentRepository.findByName(name);

    if (!student) {
      throw new Error("Estudante nao encontrado.");
    }

    return student;
  }
}