import type { FastifyInstance } from "fastify";
import * as SubjectControllers from "../controllers/subjects.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { JwtTokenService } from "../../infrastructure/auth/JwtTokenService.ts";

export async function subjectsRoutes(app: FastifyInstance) {
  app.addHook(
    "preHandler",
    authMiddleware(new JwtTokenService(process.env.JWT_SECRET!)),
  );
  app.post("/", SubjectControllers.createSubjectController);
  app.get("/", SubjectControllers.listSubjectsController);
  app.put("/:id", SubjectControllers.putSubjectController);
  app.delete("/:id", SubjectControllers.deleteSubjectController);
  app.patch("/:id", SubjectControllers.patchSubjectController);
  app.get("/:id", SubjectControllers.getSubjectByIdController);
  app.get("/:id/concept", SubjectControllers.getSubjectConceptController);
}
