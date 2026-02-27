import { Client } from 'pg'

export const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'mvp',
    password: '2551',
    port: 5432
  });


await client.connect();
