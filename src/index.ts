import Fastify from "fastify";
import { subjectsRoutes, userRoutes } from "./presentation/routes/subjects.routes.js";
import { progressRoutes } from "./presentation/routes/progress.routes.js";

import { client } from "./infrastructure/database/Client.ts";


export const app = Fastify({ logger: true });

// registra as rotas pro CRUD
await app.register(subjectsRoutes, { prefix: "/subjects"});
// registra as rotas do acompanhamento do progresso
await app.register(progressRoutes, { prefix: "/progress" });
// registra as rotas dos usuarios
await app.register(userRoutes, { prefix: "/users"});

// encapsulamento da inicialização pra não ligar o servidor em ambiente de teste
export const start = async()=>{
    try{
        await initDatabase();
        await app.listen({port:5000});
    } catch(err){
        app.log.error(err);
        process.exit(1);
    }
}

if(process.env.NODE_ENV !== 'test'){

    start();
}



// cria as tabelas 
async function initDatabase() {

  await client.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      course VARCHAR(100) NOT NULL,
      semester INT NOT NULL
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Subject (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      credits INT NOT NULL,
      year INT NOT NULL,
      semester INT NOT NULL,
      status VARCHAR(50),
      id_user INT REFERENCES Users(id) ON DELETE CASCADE
    );
  `);


  await client.query(
    `CREATE TABLE IF NOT EXISTS Progress(
        id SERIAL PRIMARY KEY,
        subjectId INT REFERENCES Subject(id) ON DELETE CASCADE,
        completedLessons INT
    );
  `);

  console.log("Tabelas criadas com sucesso");
}