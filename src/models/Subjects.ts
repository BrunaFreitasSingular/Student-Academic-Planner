interface Subject {
  id: number;
  name: string;
  credits: number;
  year: number;
  semester: number;
  status: string;
}

export type CreateSubjectDTO = Omit<Subject, "id">;