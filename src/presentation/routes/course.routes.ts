import { FastifyInstance } from "fastify";
import { createCourseController } from "../controllers/course.controllers.ts";
import { listCourseController } from "../controllers/course.controllers.ts";

export async function courseRoutes(app:FastifyInstance){
    app.post("/", createCourseController);
    app.get("/", listCourseController);
}