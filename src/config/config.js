require('dotenv').config()

const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI
}

module.exports = config