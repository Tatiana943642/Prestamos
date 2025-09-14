const express = require('express');
const session = require('express-session');
const path = require('path');
const { authenticateUser } = require('./auth');
const { query } = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Configuración de sesiones
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key_unisimon_prestamos',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Middleware para verificar autenticación
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
};

// Rutas de la API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }
    
    const authResult = await authenticateUser(username, password);
    
    if (authResult.success) {
        req.session.user = authResult.user;
        res.json({ 
            success: true, 
            message: 'Login exitoso', 
            user: authResult.user 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: authResult.message 
        });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Sesión cerrada' });
    });
});

app.get('/api/session', (req, res) => {
    if (req.session.user) {
        res.json({ 
            authenticated: true, 
            user: req.session.user 
        });
    } else {
        res.json({ authenticated: false });
    }
});

// Ruta para obtener préstamos activos
app.get('/api/prestamos-activos', requireAuth, async (req, res) => {
    try {
        const result = await query(`
            SELECT p.*, j.titulo as juego_titulo, 
                   e.nombres || ' ' || e.apellidos as estudiante_nombre,
                   e.codigo_universitario
            FROM prestamos p
            INNER JOIN juegos j ON p.codigo_juego = j.codigo_juego
            INNER JOIN estudiantes e ON p.id_estudiante = e.id_estudiante
            WHERE p.fecha_devolucion_real IS NULL
            ORDER BY p.fecha_prestamo DESC
        `);
        
        res.json({ prestamos: result.rows });
    } catch (error) {
        console.error('Error obteniendo préstamos activos:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Ruta para servir la página principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});