require('dotenv').config();
const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

function handleDisconnect() {
    connection.connect((error) => {
        if (error) {
            console.error('❌ Error al conectar a la base de datos:', error.message);
        } else {
            console.log('✅ Conectado a la base de datos');
        }
    });

    
    connection.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.warn('⚠️ Conexión perdida. Intentando reconectar una vez...');
            connection = mysql.createConnection(connection.config);
            handleDisconnect(); 
            throw err;
        }
    });
}

handleDisconnect();

module.exports = () => connection;
