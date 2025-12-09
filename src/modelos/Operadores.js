import connection from "../controladores/conexion_db.js";
import { query } from "../controladores/pool_mySQL.js/";


export const getAllOperadores = async () => {
    try {
        let sql = 'SELECT id, nombre, email, rol FROM operadores';  
        const db = await connection();
        const [operadores] = await db.execute(sql );
        if ( !operadores ) {
            return { "error": "No se encontraron operadores"};
        }
        return operadores;
    } 
    catch ( error ) {
        console.error(error);
    }   
    finally {
    }   
};

export const getOperadorById = async ( id ) => {
    try {   
        let sql = 'SELECT id, nombre, email, rol FROM operadores WHERE id = ?';
        const db = await connection();
        const [operador] = await db.execute(sql, [id] );
        if ( !operador ) {
            return { "error": "Operador no encontrado"};
        }
        return operador;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }
};

export const getOperadorByEmail = async ( email ) => {
    try {   
        let sql = 'SELECT id, nombre, email, rol FROM operadores WHERE email = ?';
        const db = await connection();
        const [operador] = await db.execute(sql, [email] ); 
        if ( !operador ) {
            return { "error": "Operador no encontrado"};
        }
        return operador;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }   
};

export const createOperador = async ( operadorData ) => {
    try {
        let sql = 'INSERT INTO operadores ( nombre, email, password, tipooperador ) VALUES ( ?, ?, ?, ? )';
        const { nombre, email, password, tipooperador } = operadorData;
        const db = await connection();
        const [result] = await db.execute(sql, [ nombre, email, password, tipooperador ] );
        if ( !result ) {
            return { "error": "No se pudo crear el operador"};
        }   
        return { id: result.insertId, nombre, email, tipooperador };
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }
};


export const deleteOperadorByEmail = async ( email ) => {
    try {
        let sql = 'DELETE FROM operadores WHERE email = ?'; 
        const db = await connection();
        const [result] = await db.execute(sql, [email] );
        if ( !result ) {
            return { "error": "No se pudo eliminar el operador"};
        }
        return result;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }   
};

export const deleteOperadorById = async ( id ) => {
    try {
        let sql = 'DELETE FROM operadores WHERE id = ?';
        const db = await connection();
        const [result] = await db.execute(sql, [id] );
        if ( !result ) {
            return { "error": "No se pudo eliminar el operador"};
        }
        return result;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }
};

export const updateOperadorByEmail = async ( email, operadorData ) => {
    try {
        let sql = 'UPDATE operadores SET nombre = ?, password = ?, tipooperador = ? WHERE email = ?';   
        const { nombre, password, tipooperador } = operadorData;
        const db = await connection();
        const [result] = await db.execute(sql, [ nombre, password, tipooperador, email ] );
        if ( !result ) {
            return { "error": "No se pudo actualizar el operador"};
        }
        return result;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }
};

export const updateOperadorById = async ( id, operadorData ) => {
    try {
        let sql = 'UPDATE operadores SET nombre = ?, password = ?, tipooperador = ? WHERE id = ?';  
        const { nombre, password, tipooperador } = operadorData;
        const db = await connection();
        const [result] = await db.execute(sql, [ nombre, password, tipooperador, id ] );
        if ( !result ) {
            return { "error": "No se pudo actualizar el operador"};
        }   
        return result;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }   
};

