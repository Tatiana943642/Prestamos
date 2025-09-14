const bcrypt = require('bcrypt');
const { query } = require('./database');

const authenticateUser = async (username, password) => {
    try {
        const result = await query(
            'SELECT u.*, r.nombre as rol_nombre FROM usuarios u INNER JOIN roles r ON u.id_rol = r.id_rol WHERE u.usuario = $1 AND u.activo = true',
            [username]
        );

        if (result.rows.length === 0) {
            return { success: false, message: 'Usuario no encontrado o inactivo' };
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.contrasena_hash);
        
        if (!passwordMatch) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        delete user.contrasena_hash;
        
        return { 
            success: true, 
            message: 'Autenticación exitosa', 
            user: user 
        };
    } catch (error) {
        console.error('Error en autenticación:', error);
        return { success: false, message: 'Error del servidor durante la autenticación' };
    }
};

module.exports = {
    authenticateUser
};