import Fastify from "fastify";
import { subjectsRoutes } from "./presentation/routes/subjects.routes.js";
import { progressRoutes } from "./presentation/routes/progress.routes.js";


export const app = Fastify({ logger: true });

// registra as rotas pro CRUD
await app.register(subjectsRoutes, { prefix: "/subjects"});
// registra as rotas do acompanhamento do progresso
await app.register(progressRoutes, { prefix: "/progress" });
//console.log(app.printRoutes());

// encapsulamento da inicialização pra não ligar o servidor em ambiente de teste
export const start = async()=>{
    try{
        await app.listen({port:5000});
    } catch(err){
        app.log.error(err);
        process.exit(1);
    }
}

if(process.env.NODE_ENV !== 'test'){
    start();
}


