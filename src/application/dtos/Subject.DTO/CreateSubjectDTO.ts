export interface CreateSubjectDTO {
  id: number;
  name: string;
  credits: number;
  year: number;
  semester: number;
  status: string;
  id_user:number;
  totalLessons:number;
}