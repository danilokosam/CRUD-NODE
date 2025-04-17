import { createClient } from 'redis'
import config from './../config/config.js'
import logger from '../utils/logger.js'

export const client = createClient({
    host: config.redisHost,
    port: config.redisPort
})

export const connectRedis = async () => {
    await client.connect()
        .then(() => logger.info('Redis connected'))
        .catch(() => logger.error('Error al conectar redis'))
}