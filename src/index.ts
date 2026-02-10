import Fastify from "fastify";
import { subjectRoutes } from "./routes/subjects.routes.js";
import { progressRoutes } from "./routes/progress.routes.js";




const app = Fastify({ logger: true });

// registra as rotas pro CRUD
await app.register(subjectRoutes, { prefix: "/subjects"});
// registra as rotas do acompanhamento do progresso
await app.register(progressRoutes, { prefix: "/progress" });
console.log(app.printRoutes());


app.listen({port: 5000});
