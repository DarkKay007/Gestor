import express from 'express';
import { Router } from 'express'; // Asegúrate de importar Router desde express
import cookieParser from 'cookie-parser';
import routerUser from './usuarios.routes.js';

const app = express();
const route = Router(); // Crea una instancia de Router

// Configura cookie-parser
app.use(cookieParser());

// Monta las rutas de estudiantes bajo la ruta '/api'
route.use("/api", routerUser);

// Ruta que utiliza cookies
route.get('/api', (req, res) => {
  // Acceder a una cookie llamada "miCookie"
  const miCookie = req.cookies.miCookie;
  // Hacer algo con la cookie...
});

// Exporta route para que pueda ser utilizado en otro lugar
export default route;
