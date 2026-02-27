import { Subject } from "../entities/Subject.js";

export interface SubjectRepository {
  create(subject: Subject): Promise<Subject>;
  findAll(): Promise<Subject[]>;
  update(id: number, subject: Partial<Subject>): Promise<Subject>;
  deleteById(id: number): Promise<void>;
}