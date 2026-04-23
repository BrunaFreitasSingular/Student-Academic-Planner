import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { subjectsRoutes } from "./presentation/routes/subjects.routes.js";
import { progressRoutes } from "./presentation/routes/progress.routes.js";
import { studentRoutes } from "./presentation/routes/student.routes.ts";
import { courseRoutes } from "./presentation/routes/course.routes.ts";
import { loginRoutes } from "./presentation/routes/login.routes.ts";
import { userRoutes } from "./presentation/routes/user.routes.ts";
import { authMiddleware } from "./presentation/middleware/auth.middleware.ts";

export const app = Fastify({ logger: true });

await app.register(cors, {
  origin: process.env.FRONTEND_URL, 
  methods: ["GET", "POST", "PUT", "DELETE"],
});

await app.register(loginRoutes, { prefix: "/login" });
await app.register(userRoutes, { prefix: "/user" });

await app.register(async (protectedApp) => {
  protectedApp.addHook("preHandler", authMiddleware);

  await protectedApp.register(subjectsRoutes, { prefix: "/subjects" });
  await protectedApp.register(progressRoutes, { prefix: "/progress" });
  await protectedApp.register(studentRoutes, { prefix: "/student" });
  await protectedApp.register(courseRoutes, { prefix: "/course" });
});

// encapsulamento da inicialização pra não ligar o servidor em ambiente de teste
export const start = async () => {
  try {
    await app.listen({ port: 3001 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== "test") {
  start();
}
