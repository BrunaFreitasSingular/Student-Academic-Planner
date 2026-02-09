interface Subject {
  id: number;
  name: string;
  credits: number;
  year: number;
  semester: number;
  status: string;
}

interface Profile {
    name: string;
    course: string;
    semester: number;
}

export type CreateSubjectDTO = Omit<Subject, "id">;