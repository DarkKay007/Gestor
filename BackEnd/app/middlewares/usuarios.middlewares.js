import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const tokenSign = (data) => {
  return jwt.sign(
    {
      email: data.email,
      password: data.password,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TIMEEXPIRED,
    }
  );
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const validarPermiso = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token || !verifyToken(token)) {
      return res.status(403).json({
        error: 'No tiene permiso para acceder',
        token: 'Token inválido',
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      token: 'Error al procesar el token',
    });
  }
};
