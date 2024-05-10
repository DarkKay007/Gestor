import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
const app = express();

// Middleware para habilitar CORS con configuración específica
app.use(cors({
  origin: 'http://localhost:5173', // Especifica el origen permitido (la dirección de tu aplicación de React)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", routes);
export default app;
