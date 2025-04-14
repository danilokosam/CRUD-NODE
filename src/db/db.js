import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config(); // Para leer el arvivo .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log(`Connected to the database ${DB_DATABASE}`);
});
export default connection;