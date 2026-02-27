import { jest } from '@jest/globals'

import { UpdateSubjectUseCase } from "../application/useCases/putSubject.useCase.ts"


//USANDO MOCK MANUAL
describe('updateSubjectTest', ()=>{
    const repository = {
      update: jest.fn()
    } as any;

    const useCase = new UpdateSubjectUseCase(repository);

     it('deve lançar erro quando o id for invalido', async()=>{
        await expect(useCase.execute(0, {} as any)).rejects.toThrow("ID é obrigatório")
    })
});