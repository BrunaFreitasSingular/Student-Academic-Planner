import * as subjectsRepository from "../../domain/repositories/subjects.repository.js"

import type { CreateSubjectDTO } from "../../domain/entities/Subjects.js";

export async function createSubject(data: CreateSubjectDTO) {
  return subjectsRepository.create(data);
}

export async function listSubjects() {
  return subjectsRepository.findAll();
}

export async function updateSubject(id: number, data: CreateSubjectDTO) {
  return subjectsRepository.update(id, data);
}

export async function patchSubject(id: number, data: Partial<CreateSubjectDTO>) {
  return subjectsRepository.update(id, data);
}

export async function deleteSubject(id: number) {
  return subjectsRepository.deleteById(id);
} 
