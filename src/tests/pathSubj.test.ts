import { jest } from "@jest/globals";

import { PatchSubjectUseCase } from "../application/useCases/Subjects/patchSubject.useCase.ts";

//usada para chamar a API
import axios from "axios";

//Testando PatchSubjectUseCase
describe("PatchSubjectUseCase", () => {
  //testa se gera o erro caso o id não seja informado
  it("deve lançar erro se id não for informado", async () => {
    const repositoryMock = {
      update: jest.fn(),
    };

    const useCase = new PatchSubjectUseCase(repositoryMock as any);

    await expect(
      useCase.execute(null as any, { name: "Math" }),
    ).rejects.toThrow("ID é obrigatório");
  });
});

// testa se envia o erro caso o body esteja vazio
it("deve lançar erro se nenhum campo for enviado", async () => {
  const repositoryMock = {
    update: jest.fn(),
  };

  const useCase = new PatchSubjectUseCase(repositoryMock as any);

  await expect(useCase.execute(1, {})).rejects.toThrow(
    "Nenhum campo enviado para atualização",
  );
});

jest.mock("axios");
