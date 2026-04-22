import { Student } from "../entities/Student.ts";

export interface StudentRepository {
  create(student: Student): Promise<Student>;
  findAll(): Promise<Student[]>;
  findById(id: number): Promise<Student | null>;
  findByName(name: string): Promise<Student | null>;
  findByUserId(user_id: string): Promise<Student | null>;
}
