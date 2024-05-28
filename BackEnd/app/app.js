// app.js
import express from "express";
import cors from "cors";
import pkg from "body-parser";
import routes from "./routes/index.js";
import { connect } from "./config/mongodb.js";

const { json } = pkg;
const app = express();


// Configurar CORS
app.use(cors());

app.use(json());

// Usar rutas definidas en el archivo de rutas
app.use("/api", routes);

// Conectar a la base de datos
connect().catch(console.dir);

export default app;
