
import { jest } from '@jest/globals'

import { CreateSubjectUseCase } from '../application/useCases/createSubject.useCase.ts';

import type { CreateSubjectDTO } from "../application/dtos/CreateSubjectDTO.ts";

import { PrismaSubjectRepository } from "../infrastructure/database/repositories/PrismaSubjectRepository.ts";

jest.mock("../infrastructure/database/PrismaSubjectRepository.ts");


//USANDO MOCK MANUAL - criando parametro dentro da funcao 
describe('createSubjectTest', ()=>{
    const repository = new PrismaSubjectRepository();
    const useCase = new CreateSubjectUseCase(repository);
    
// testa se quando o nome é null o sistema lança erro (validando o nome, desconsiderando os outros atributos)
    it("deve lançar erro ao cadastrar a disciplina sem nome", async ()=>{
        await expect( useCase.execute({
            name: null
        } as unknown as CreateSubjectDTO)
        ).rejects.toThrow("Nome é obrigatório");
    })
// Valida se lança o erro de creditos invalidos
    it('deve lançar erro quando num de creditos invalido', async ()=>{
        await expect( useCase.execute({
          name: "Bruna",
          credits: 1,
          year: 2010,
          semester: 3,
          status: "Concluída"
        } as unknown as CreateSubjectDTO)).rejects.toThrow("Numero de creditos invalido")
    })
});

// testa o comportamento do controller ao chamar a funcao createSubjectController quando uma nova disciplina é criada com sucesso
import { createSubjectController} from "../presentation/controllers/subjects.controllers.ts"

it("deve retornar 201 ao criar subject", async () => {
  jest
    .spyOn(PrismaSubjectRepository.prototype, "create")
    .mockResolvedValue({ id: 1, name: "Math" } as any);

  // simulacao da requisicao
  const req = {
    body: { name: "Math", 
    description: "desc", 
    credits: 4,
    semester:1
  },
  } as any;

//mockReturnThis permite o encadeamneto reply.status().send() simulando um framework fastify/express - nesse caso, afuncao createSubjectController necessita desse encadeamneto na hora de retornar a resposta // return reply.status(201).send(result);
   
  const reply = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as any;

  await createSubjectController(req, reply);

  expect(reply.status).toHaveBeenCalledWith(201);
  expect(reply.send).toHaveBeenCalledWith({ id: 1, name: "Math" });
});


