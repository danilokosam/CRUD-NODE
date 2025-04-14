import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';

dotenv.config(); // Para leer el arvivo .env
const app = express();
app.set('view engine', 'ejs'); // Para usar EJS como motor de plantillas

app.use('/', router); // Para usar el router

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    console.log(`http://localhost:${PORT}`);
})
