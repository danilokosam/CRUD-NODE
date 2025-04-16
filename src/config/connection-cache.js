import { createClient } from 'redis'
import config from './../config/config.js'

export const client = createClient({
    host: config.redisHost,
    port: config.redisPort
})

export const connectRedis = async () => {
    await client.connect()
        .then(() => console.log('Redis connected'))
        .catch(() => console.error('Error al conectar redis'))
}