import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config(); 

export const pool = createPool({
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDABASE,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT
});
