import Fastify from "fastify";
import { subjectRoutes } from "./routes/subjects.routes.ts";




const app = Fastify({ logger: true });

// registra as rotas
app.register(subjectRoutes, {
  prefix: "/subjects"
});

app.listen({port: 5000,host: "0.0.0.0"});
