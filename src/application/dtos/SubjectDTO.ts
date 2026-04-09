import { SubjectType } from "@prisma/client";

export interface CreateSubjectDTO {
  name: string;
  credits: number;
  year: number;
  semester: number;
  status: string;
  id_user:number;
  totalAssessments:number;
  assessmentsWeights:number[];
  type: SubjectType;
}