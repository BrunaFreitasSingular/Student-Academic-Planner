import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user.controllers.ts";
import { listUserController } from "../controllers/user.controllers.ts"

export async function userRoutes(app: FastifyInstance) {
  app.post("/", createUserController);
  app.get("/", listUserController);
    //   app.put("/:id", putUserController);
    //   app.delete("/:id", deleteUserController);
    //   app.patch("/:id", patchUserController);
}
