import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';

dotenv.config(); // Para leer el arvivo .env
const app = express();
app.set('view engine', 'ejs'); // Para usar EJS como motor de plantillas
const PORT = process.env.PORT; // Para usar el puerto definido en el archivo .env
const REGISTER = process.env.REGISTER; // Para usar el puerto definido en el archivo .env

app.use('/', router); // Para usar el router

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    console.log(`http://localhost:${PORT}`);
})

app.post(REGISTER, (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    console.log('Datos recibidos:', req.body);

    const sql = 'INSERT INTO smed_technology.smed_registro (nombre, apellido, email, password) VALUES (?,?,?,?)';
    connection.query(sql, [nombre, apellido, email, password], (err, result) => {
        if (err) {
            console.error('Error al ingresar datos:', err);
            res.status(500).send('Error al registrar un ususario');
            return;
        }
        console.log('Registro insertado:', result);
        res.status(200).send('Usuario registrado exitosamente');
    });
});
