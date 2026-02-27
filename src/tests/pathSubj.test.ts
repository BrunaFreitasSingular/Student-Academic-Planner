
import { jest } from '@jest/globals'

import { PatchSubjectUseCase } from "../application/useCases/patchSubject.useCase.ts"

//usada para chamar a API
import axios from 'axios';

//Testando PatchSubjectUseCase
describe("PatchSubjectUseCase", () => {

  //testa se gera o erro caso o id não seja informado
  it("deve lançar erro se id não for informado", async () => {
    const repositoryMock = {
      update: jest.fn(),
    };

    const useCase = new PatchSubjectUseCase(repositoryMock as any);

    await expect(
      useCase.execute(null as any, { name: "Math" })
    ).rejects.toThrow("ID é obrigatório");
  });

});


// testa se envia o erro caso o body esteja vazio
it("deve lançar erro se nenhum campo for enviado", async () => {
  const repositoryMock = {
    update: jest.fn(),
  };

  const useCase = new PatchSubjectUseCase(repositoryMock as any);

  await expect(
    useCase.execute(1, {})
  ).rejects.toThrow("Nenhum campo enviado para atualização");
});

jest.mock('axios');

/*

//======================================================================
//Como passar os dados para uma "promessa resolvida" sem dar erro na typagem

//======================================================================

// testa se conseguiu chamar corretamente o repositorio.update
it("deve chamar repository.update com id e dados corretos", async () => {
    const repositoryMock = {
        update: jest.fn().mockResolvedValue({id: 1, name: "Programacao"}) as jest.Mock,
    };

  const useCase = new PatchSubjectUseCase(repositoryMock as any);

  const data = { name: "Programacao" };

  await useCase.execute(1, data);

  expect(repositoryMock.update).toHaveBeenCalledWith(1, data);
});

// testa o valor do retorno do repositorio
it("deve retornar o resultado do repository", async () => {
  const subjectAtualizado = { id: 1, name: "Physics" };

  const repositoryMock = {
    update: jest.fn().mockResolvedValue(subjectAtualizado),
  };

  const useCase = new PatchSubjectUseCase(repositoryMock as any);

  const result = await useCase.execute(1, { name: "Physics" });

  expect(repositoryMock.update).toHaveBeenCalledWith(1, { name: "Physics" });
  expect(result).toEqual(subjectAtualizado);
});

//======================================================================

*/