const mongoose = require('mongoose')
const config = require('./config')

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI)
        console.log('Base de datos conectada')
    } catch (err) {
        console.error('Error', err)
    }
}

module.exports = connectDB
