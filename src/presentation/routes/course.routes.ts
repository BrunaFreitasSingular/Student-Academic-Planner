import { FastifyInstance } from "fastify";
import * as CourseControllers from "../controllers/course.controllers.ts";

export async function courseRoutes(app: FastifyInstance) {
  app.post("/", CourseControllers.createCourseController);
  app.get("/", CourseControllers.listCourseController);
}
