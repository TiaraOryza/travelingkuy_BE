//impoert module
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load konfigurasi dari .env
dotenv.config(); 

// Buat koneksi pool ke MySQL
const pool = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT,
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0,
});

//melakukan export module
export { pool };
