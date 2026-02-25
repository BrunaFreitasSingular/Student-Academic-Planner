
import { jest } from "@jest/globals";

import { ListSubjectsUseCase } from "../application/useCases/listSubject.useCase.ts";

import { PrismaSubjectRepository } from "../infrastructure/database/repositories/PrismaSubjectRepository.ts";


/*
// testa se chamou o repository.findAll corretamente
describe("ListSubjectsUseCase", () => {

  it("deve chamar repository.findAll", async () => {

    const repositoryMock = {
      findAll: jest.fn().mockResolvedValue([]),
    };

    const useCase = new ListSubjectsUseCase(repositoryMock as any);

    await useCase.execute();

    expect(repositoryMock.findAll).toHaveBeenCalled();
  });

});
*/