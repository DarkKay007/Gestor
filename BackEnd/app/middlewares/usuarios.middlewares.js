import jwt from "jsonwebtoken";
import { config } from "dotenv";
import cors from "cors"
config();

export const tokenSign = (data) =>{ //Para crear token
    return jwt.sign({
        email : data.email,
        password : data.password,
        firma : "becerra"
    },process.env.JWT_SECRET,
    {
        expiresIn : process.env.JWT_TIMEEXPIRED
    })
}
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}
export const validarPermiso = (req, res, next)=>{

  let token = req.body["x-access-token"];

  try {
      if (verifyToken(token)==null){
          res.json({
              "error":"No tiene permiso para acceder",
              "token": "token invalido"
          })
      }else{
          next();
      }
  } catch (error) {
      res.json({
          "error":error,
          "token": "token invalido"
      });
  }
}