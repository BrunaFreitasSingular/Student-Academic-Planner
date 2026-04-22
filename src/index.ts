import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";
import { subjectsRoutes } from "./presentation/routes/subjects.routes.js";
import { progressRoutes } from "./presentation/routes/progress.routes.js";
import { studentRoutes } from "./presentation/routes/student.routes.ts";
import { courseRoutes } from "./presentation/routes/course.routes.ts";
import { loginRoutes } from "./presentation/routes/login.routes.ts";
import { userRoutes } from "./presentation/routes/user.routes.ts";

export const app = Fastify({ logger: true });

await app.register(cors, {
  origin: "http://localhost:3000", // URL do frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// registra as rotas pro CRUD
await app.register(subjectsRoutes, { prefix: "/subjects" });
// registra as rotas do acompanhamento do progresso
await app.register(progressRoutes, { prefix: "/progress" });

await app.register(studentRoutes, { prefix: "/student" });

await app.register(courseRoutes, { prefix: "/course" });

await app.register(loginRoutes, { prefix: "/login" });

await app.register(userRoutes, { prefix: "/user" });
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
