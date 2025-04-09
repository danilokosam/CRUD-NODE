import express from 'express'
const app = express()
import config from './config/config.js'
import connectDB from './config/connection-db.js'
import handlerError from './middlewares/handlerErrors.js'
import productRouter from './routes/productRouter.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPlain = await fs.readFile(path.join(__dirname, './utils/swagger.json'), 'utf-8')
const swaggerDoc = JSON.parse(swaggerPlain)

app.use(express.json())

connectDB()

app.use('/api/products', productRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(handlerError)

app.listen(config.port, () => {
    console.log(`Api encendida en el puerto ${config.port}`)
})