import jwt from "jsonwebtoken";
import { config } from "dotenv";
import Cookies from "js-cookie"; // Importa la biblioteca js-cookie

config();

// Función para crear un token
export const tokenSign = (data) => {
    return jwt.sign(
        {   
            correo: data.email,
            password: data.password,
            nombre: data.name
        }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_TIMEEXPIRED
        },
    );
}

// Función para verificar un token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }    
}

// Middleware para validar permisos con token
export const validarPermiso = (req, res, next) => { 
    try {
        let token = req.headers['x-acces-token'];
        if (verifyToken(token) == null) {
            res.json({
                "error": "Sin permiso de ingreso",
                "type": "token errado"
            });
        } else {
            // Si el token es válido, guarda el token en las cookies
            Cookies.set('token', token); // Guarda el token en una cookie llamada 'token'
            next();
        }
    } catch (error) {
        console.log(error);
        res.json({
            "error": error,
            "type": "token errado"
        });
    }
}
