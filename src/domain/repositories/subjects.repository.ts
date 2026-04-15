import { Subject } from "../entities/Subject.js";

export interface SubjectRepository {
  create(subject: Subject): Promise<Subject>;
  findAll(): Promise<Subject[]>;
  update(id: number, subject: Partial<Subject>): Promise<Subject>;
  deleteById(id: number): Promise<void>;
  findByStudentId(student_id: number): Promise<Subject[]>;
  findById(id: number): Promise<Subject | null>;
}
