//import { prisma } from "../prismaClient.ts";
//import { app } from '../index.ts';

//import { describe, expect, test } from '@jest/globals';

import { sum } from "./sum.ts";

//grupo de testes
describe("sum", () => {
  let sumResult: number;
  //quando queremos executar algo antes dos testes
  beforeAll(() => {
    sumResult = 10;
    console.log("Executado antes dos testes " + sumResult);
  });

  //quando queremos executar algo depois dos testes
  afterAll(() => {
    console.log("Executado após os testes");
  });
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("sum of 2 + 2 must be 4", () => {
    const result = sum(3, 7);
    expect(result).toBe(10);
  });
});

/*

describe("subjects.controllers",()=>{
  it('should throw if signInModel is invalid', async ()=>{
    const subjects.controllers = new subjects.controllers();
  })
})

*/
