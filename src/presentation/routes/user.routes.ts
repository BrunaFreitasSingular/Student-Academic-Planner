import { FastifyInstance } from "fastify";
import * as UserControllers from "../controllers/user.controllers.ts";

export async function userRoutes(app: FastifyInstance) {
  app.post("/", UserControllers.createUserController);
  app.get("/", UserControllers.listUserController);
  app.get("/:id", UserControllers.getUserByIdController);
  app.post("/login", UserControllers.loginUserController);
    //   app.put("/:id", putUserController);
    //   app.delete("/:id", deleteUserController);
    //   app.patch("/:id", patchUserController);
}
