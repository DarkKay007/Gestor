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
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmailAndPassword(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = createToken(user);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", routes);
export default app;
