import { pool } from "../config/bd-mysql.js";
import { tokenSign } from "../middlewares/usuarios.middlewares.js";
import { getCurrentDateTime } from "../util/dateHelper.js ";

export const getUser = async (req, res) => {
  let id = req.params.id;
  try {
    const resultado = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);
    res.json(resultado[0]);
  } catch (error) {
    res.json({
      error: error,
      message: "Error en la consulta Get",
    });
  }
};
export const UserList = async (req, res) => {
  try {
    

    // Realiza la consulta a la base de datos
    const resultado = await pool.query("select * from usuarios");

    // Devuelve los resultados y establece una cookie de respuesta si es necesario

    res.json(resultado[0]); // Devuelve los resultados al cliente
  } catch (error) {
    res.status(500).json({ error: error, message: "Error en la consulta Get" });
  }
};
export const postUser = async (req, res) => {
  const { user, name, password, email, rol } = req.body;
  const date_create = new Date().toISOString().slice(0, 19).replace("T", " "); // Obtenemos la fecha actual en el formato deseado
  console.log(req.body)
  try {
    const resultado = await pool.query(
      "INSERT INTO usuarios (user, name, password, email, rol, date_create) VALUES (?, ?, ?, ?, ?, ?)",
      [user, name, password, email, rol, date_create]
    );

   
      res.json({ message: "Usuario creado exitosamente" });
    
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error al crear usuario" });
  }
};


export const putUser = async (req, res) => {
  const { id, user, name, password, email, rol } = req.body;

  // Obtiene la fecha y hora actual
  const date_create = getCurrentDateTime();

  try {
    await pool.query(
      "UPDATE usuarios SET user = ?, name = ?, password = ?, email = ?, rol = ?, date_create = ? WHERE id = ?",
      [user, name, password, email, rol, date_create, id]
    );

    res.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM usuarios WHERE id =?", [id]);

    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res
     .status(500)
     .json({ error: error.message, message: "Error al eliminar usuario" });
  }
};

export const loginUser = async(req, res)=>{
    
  let email = req.body.email;
  let password = req.body.password;

  try {
      let resultado = await pool.query(`
      select email from usuarios
      where email = '${email}' and password = '${password}'
      `);

      if (resultado[0]==""){
          res.json({
              respuesta:"user o password incorrecto",
              estado:false
          });
      }else{
          let token = tokenSign({
              email:email,
              password:password
          });

          res.json({
              respuesta:"login correcto",
              estado:true,
              token:token
          });
      }
  } catch (error) {
      res.json({
        respuesta:"Error en el login",
        type:error,
        
      })
        console.log(error)
  }
}
