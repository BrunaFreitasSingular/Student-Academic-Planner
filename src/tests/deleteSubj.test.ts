import { jest } from "@jest/globals";

import { DeleteSubjectUseCase } from "../application/useCases/Subjects/deleteSubject.useCase.ts";

jest.mock("../infrastructure/database/PrismaSubjectRepository.ts");

import { mock, MockProxy } from "jest-mock-extended";
import { SubjectRepository } from "../domain/repositories/subjects.repository.ts";

//USANDO MOCK MANUAL

describe("deleteSubjectTest", () => {
  const repository = {
    deleteById: jest.fn(),
  } as any;

  const useCase = new DeleteSubjectUseCase(repository);

  //testa se lanca o erro corretamente quando entra id invalido
  it("deve lançar erro quando for passado um id invalido / !number", async () => {
    await expect(useCase.execute(0)).rejects.toThrow("ID é obrigatório");
  });

  // teste de sucesso - id === number
  it("deve chamar deleteById quando id for válido", async () => {
    await useCase.execute(1);

    expect(repository.deleteById).toHaveBeenCalledWith(1);
  });
});

// USANDO MOCK AUTOMÁTICO
describe("deleteSubjectTest", () => {
  let repository: MockProxy<SubjectRepository>;
  let useCase: DeleteSubjectUseCase;

  beforeEach(() => {
    // criacao automatica: gera todos os metodos da interface como mocks
    repository = mock<SubjectRepository>();
    useCase = new DeleteSubjectUseCase(repository);
  });

  //testa se foi chamado o repositorio corretamente
  it("deve chamar deleteById quando id for válido", async () => {
    await useCase.execute(1);
    expect(repository.deleteById).toHaveBeenCalledWith(1);
  });
});
