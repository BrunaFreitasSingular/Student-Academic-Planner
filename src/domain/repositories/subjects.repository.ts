import { CreateSubjectDTO } from "../../domain/entities/Subjects.js";



export interface SubjectRepository {
  create(data: CreateSubjectDTO): Promise<CreateSubjectDTO>;
  findAll(): Promise<CreateSubjectDTO[]>
  update(id: number, data: Partial<CreateSubjectDTO>): Promise<CreateSubjectDTO>;
  deleteById(id: number): Promise<void>;
}