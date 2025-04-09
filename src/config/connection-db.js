import mongoose from 'mongoose'
import config from './config.js'

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI)
        console.log('Base de datos conectada')
    } catch (err) {
        console.error('Error', err)
    }
}

export default connectDB