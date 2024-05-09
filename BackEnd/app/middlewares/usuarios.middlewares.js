import jwt from "jsonwebtoken";
import { pool } from "../config/bd-mysql.js";
import Cookies from "js-cookie"; // Importa la biblioteca js-cookie

// Función para verificar un token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }    
}

// Middleware para validar permisos con token
export const validarPermiso = async (req, res, next) => { 
    try {
        let token = Cookies.get('token'); // Obtiene el token de la cookie

        if (!token) {
            return res.status(401).json({ message: "No se proporcionó un token" });
        }

        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }

        // Verifica si el token está en la base de datos
        const result = await pool.query("SELECT * FROM tokens WHERE token = ?", [token]);

        if (result.length === 0) {
            return res.status(401).json({ message: "Token no encontrado en la base de datos" });
        }

        // Si todo está bien, el token es válido y existe en la base de datos
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Error al validar el token"
        });
    }
}
export const tokenSign = (data) => {
    return jwt.sign(
        {   
            email: data.email,
            id: data.id
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_TIMEEXPIRED
        },
    );
}