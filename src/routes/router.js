import express from 'express';
import dotenv from 'dotenv';
import connection from '../db/db.js'; // Para conectar a la base de datos

dotenv.config(); // Para leer el arvivo .env
const router = express.Router();
export default router;
// const ROUTER = process.env.ROUTER
// const connection = require('./db/db');
// const connection = process.env.DB_CONNECTION

router.get('/', (req, res) => {
    connection.query('select * from db_crud_node.users;', (err, rows) => {
        if(err) {
            console.error('Error connecting to the database:', err);
            throw err
        } else {
            console.log('Connected to the database');
            res.send(rows)
        }
    })
})
