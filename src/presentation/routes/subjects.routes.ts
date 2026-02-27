import { FastifyInstance } from "fastify";

import{
  createSubjectController,
  listSubjectsController,
  putSubjectController,
  deleteSubjectController,
  patchSubjectController
} from "../controllers/subjects.controllers.js"


import {
  createUser,
  createSubject,
  getUserSubjects,
  getUserbyId
} from "../../presentation/controllers/subjects.controllers.ts";



export async function subjectsRoutes(app: FastifyInstance) {
  //pg
  app.post("/", createSubject);
  app.get("/:id", getUserSubjects);
  
  //prisma
  app.post("/prisma", createSubjectController);
  app.get("/prisma", listSubjectsController);
  app.put("/:id", putSubjectController);
  app.delete("/:id", deleteSubjectController);
  app.patch("/:id", patchSubjectController);
}

export async function userRoutes(app: FastifyInstance){
//pg
  app.post("/", createUser);
  app.get("/:id", getUserbyId);
}
