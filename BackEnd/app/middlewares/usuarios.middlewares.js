import jwt from "jsonwebtoken";
import { config } from "dotenv";
import cors from "cors"
config();


export const tokenSign = (data) =>{ //Para crear token
  return jwt.sign({
      email : data.email,
      password : data.password,
  },process.env.JWT_SECRET,
  {
      expiresIn : process.env.JWT_TIMEEXPIRED
  })
}
export const validarPermiso = (req, res, next) => {
  try {
    // Obtener el token del encabezado de autorización
    const token = req.headers.authorization.split(" ")[1];

    // Verificar si el token es válido
    if (!token || verifyToken(token) === null) {
      return res.status(403).json({
        error: "No tiene permiso para acceder",
        token: "Token inválido"
      });
    }

    // Si el token es válido, pasar al siguiente middleware
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      token: "Error al procesar el token"
    });
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};