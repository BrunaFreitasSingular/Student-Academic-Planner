import { FastifyInstance } from "fastify";

import * as loginController from "../controllers/login.controllers.ts";
import * as userController from "../controllers/user.controllers.ts";

export async function loginRoutes(app: FastifyInstance) {
  app.post("/", loginController.loginController);
  app.get("/users", userController.listUsersController);
  app.post("/users", userController.createUserController);
}
