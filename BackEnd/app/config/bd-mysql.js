import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config(); // Carga las variables de entorno desde el archivo .env

export const pool = createPool({
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDABASE,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT
});
