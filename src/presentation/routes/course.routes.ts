import type { FastifyInstance } from "fastify";
import * as CourseControllers from "../controllers/course.controllers.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { JwtTokenService } from "../../infrastructure/auth/JwtTokenService.ts";

export async function courseRoutes(app: FastifyInstance) {
  app.addHook(
    "preHandler",
    authMiddleware(new JwtTokenService(process.env.JWT_SECRET!)),
  );
  app.post("/", CourseControllers.createCourseController);
  app.get("/", CourseControllers.listCourseController);
}
