import express from 'express'
const app = express()
import config from './config/config.js'
import connectDB from './config/connection-db.js'
import handlerError from './middlewares/handlerErrors.js'
import productRouter from './routes/productRouter.js'
import authRouter from './routes/authRouter.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan'
import logger from './utils/logger.js'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPlain = await fs.readFile(path.join(__dirname, './utils/swagger.json'), 'utf-8')
const swaggerDoc = JSON.parse(swaggerPlain)

const stream = {
    write: (message) => logger.info(message.trim())
}

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(morgan('combined', {stream}))

connectDB()

app.use('/api/products', productRouter)
app.use('/api', authRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(handlerError)

app.listen(config.port, () => {
    console.log(`Api encendida en el puerto ${config.port}`)
})