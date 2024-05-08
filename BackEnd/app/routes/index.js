import express from 'express';
import { Router } from 'express'; // Asegúrate de importar Router desde express
import cookieParser from 'cookie-parser';

/**
 * !Importaciones de las rutas de los Usuarios
 */
import routerUser from './usuarios.routes.js';
import routerProjects from './projects.routes.js';

const app = express();
const route = Router(); // Crea una instancia de Router

// Configura cookie-parser
app.use(cookieParser());

// Monta las rutas de usuarios bajo la ruta '/api'
route.use("/api", routerUser);
// Monta las rutas de proyectos bajo la ruta '/api'
route.use("/api", routerProjects);

// Ruta que utiliza cookies
route.get('/api', (req, res) => {
  // Acceder a una cookie llamada "miCookie"
  const miCookie = req.cookies.miCookie;
  // Hacer algo con la cookie...
});

// Exporta route para que pueda ser utilizado en otro lugar
export default route;
