import { FastifyInstance } from "fastify";

import * as userController from "../controllers/user.controllers.ts";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", userController.listUsersController);
  app.post("/", userController.createUserController);
}
