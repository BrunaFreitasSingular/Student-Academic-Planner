import Fastify from "fastify";
import { subjectRoutes } from "./routes/subjects.routes.js";




const app = Fastify({ logger: true });

// registra as rotas
app.register(subjectRoutes, {
  prefix: "/subjects"
});

app.listen({port: 5000});
