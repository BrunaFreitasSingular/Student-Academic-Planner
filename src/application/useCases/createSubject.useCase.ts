import { SubjectRepository } from "../../domain/repositories/subjects.repository.js"

import type { CreateSubjectDTO } from "../../application/dtos/Subject.DTO/CreateSubjectDTO.ts";

export class CreateSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  // validar os dados aqui 
  async execute(data: CreateSubjectDTO) {

    if (!data.name) {
      throw new Error("Nome é obrigatório");
    }

    const valoresCreditosPermitidos = [2,4,6];

    if(!valoresCreditosPermitidos.includes(data.credits)){
        throw new Error("Numero de creditos invalido");
    }

    const valoresSemestrePermitidos = [1,2];

    if(!valoresSemestrePermitidos.includes(data.semester)){
        throw new Error("Adicione um semestre valido (1) ou (2).")
    }

    return this.subjectRepository.create(data);
  }
}
