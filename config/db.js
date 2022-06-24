/* import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
  configDatabase.ssl = {
    rejectUnauthorized: false,
  };
}

console.log(configDatabase);
const db = new Pool(configDatabase);
export default db; */

import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const databaseConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: process.env.PASSWORD,
    database: 'laboleria'
}

const db = new Pool(databaseConfig);

export default db;