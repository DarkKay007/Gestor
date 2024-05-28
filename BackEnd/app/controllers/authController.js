import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { collection } from '../models/userModels.js';
import dotenv from 'dotenv';

dotenv.config();

async function login (req, res) {
  const { user, password } = req.body;

  try {
    const existingUser = await collection.findOne({ user });
    if (!existingUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: existingUser._id, rol: existingUser.rol }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Función de registro
async function register(req, res) {
  const { user, password, email,name } = req.body;

  try {
    const existingUser = await collection.findOne({ user });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      user,
      name,
      password: hashedPassword,
      email,
      rol: 'Usuario', // Define el rol por defecto
      date_create: new Date()
    };

    const result = await collection.insertOne(newUser);
    console.log("User created:", result);

    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    console.error(`Error registering: ${error}`);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
}
// Función para cerrar sesión
async function logoutUser(req, res) {
  // Eliminar el token de la sesión
  res.clearCookie('token');
  res.redirect('/'); // Redireccionar al usuario a la página de inicio
}

export { login, register,logoutUser };
