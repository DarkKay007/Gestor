import express from 'express';
import { Router } from 'express'; // Asegúrate de importar Router desde express
import cookieParser from 'cookie-parser';

/**
 * !Importaciones de las rutas de los Usuarios
 */
import routerUser from './usuarios.routes.js';
import routerProjects from './projects.routes.js';
import routerTareas from './tareas.routes.js';
import routerAsignaciones from './asignaciones.routes.js';

const app = express();
const route = Router(); // Crea una instancia de Router

// Configura cookie-parser
app.use(cookieParser());
route.use("/api",routerTareas)
route.use("/api", routerUser);
route.use("/api", routerProjects);
route.use("/api", routerAsignaciones);


// Ruta que utiliza cookies
route.get('/api', (req, res) => {
  // Acceder a una cookie llamada "miCookie"
  const miCookie = req.cookies.miCookie;
  // Hacer algo con la cookie...
});

// Exporta route para que pueda ser utilizado en otro lugar
export default route;
