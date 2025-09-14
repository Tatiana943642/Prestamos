const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'prestamos_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'prestamos_db',
    password: process.env.DB_PASSWORD || 'password_seguro',
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
    } else {
        console.log('Conexión exitosa a la base de datos PostgreSQL');
        release();
    }
});

const query = (text, params) => {
    return pool.query(text, params);
};

const getClient = () => {
    return pool.connect();
};

module.exports = {
    query,
    getClient,
    pool
};