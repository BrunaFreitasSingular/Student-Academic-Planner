import * as subjectsRepository from "../repositories/subjects.repository.js"

import type { CreateSubjectDTO, UpdateSubjectDTO } from "../models/Subjects.js";

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
