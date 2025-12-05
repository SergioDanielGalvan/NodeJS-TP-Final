// src/controladores/authControlers.js
import jwt from "jsonwebtoken";
import connection from "../controladores/conexion_db.js";
import { query } from "../controladores/pool_mySQL.js/";
import crypto from "crypto";

/*
{
  "email": "sdg@gmail.com",
  "password": "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"
}
*/

export const login = async (req, res) => {
  const { email, password } = req.body;
  if ( !email || !password ) {  
    return res.status(400).json({ error: "Faltan credenciales" });
  }
  try {
    let sql = 'SELECT email, password, intentos FROM operadores WHERE email = ? AND password = ?';
    const db = await connection();
    const params = [email, hashString(password)];
    const usuario = await db.execute(sql, params);
    if ( !usuario ) {
      return {"error": "Credenciales no encontradas"};
    }
    console.log( usuario );
    if ( usuario[0].length == 1 ) {
      if ( usuario[0][ "email" ].length == 0 ) { 
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
      // Generar el token JWT
      if ( email == usuario[0][ "email" ] ) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "V1trS3cr3t!", {
          expiresIn: "1h",
        });
        // Set de campos en la tabla operadores
        let sqlUpdate = 'UPDATE operadores SET last_login = NOW(), intentos = 0 WHERE email = ?';
        const updateParams = [email];
        await db.execute(sqlUpdate, updateParams);
        
        //  Enviar el token en la respuesta
        return res.json({ token });
      }
    } 
  }
  catch (error) {
      console.error(error);
      throw error;
  }
  finally {
    // Liberar si quedó algun recursos en uso
  }
  res.status(401).json({ error: "Credenciales inválidas" });
};

function hashString( input ) {
    return crypto.createHash('sha256').update(input).digest('hex');
}
