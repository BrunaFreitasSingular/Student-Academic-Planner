import { Subject } from "../entities/Subject.js";
import { AssessmentData } from "../../infrastructure/database/repositories/PrismaSubjectRepository.js"
export type SubjectUpdateData = Partial<Omit<Subject, 'id' | 'assessments'>> & {
  assessments?: AssessmentData[]
}

export interface SubjectRepository {
  create(subject: Subject): Promise<Subject>;
  findAll(): Promise<Subject[]>;
  update(id: number, data: SubjectUpdateData): Promise<Subject>;
  deleteById(id: number): Promise<void>;
  findByStudentId(id_student: number): Promise<Subject[]>;
  findById(id: number): Promise<Subject | null>;
}
