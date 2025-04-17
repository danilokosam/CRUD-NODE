import mongoose from 'mongoose'
import config from './config.js'
import logger from '../utils/logger.js'

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI)
        logger.info('Base de datos conectada')
    } catch (err) {
        logger.error('Error', err)
    }
}

export default connectDB