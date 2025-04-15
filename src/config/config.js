import dotenv from 'dotenv'
dotenv.config()

const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtSecretRefresh: process.env.JWT_SECRET_REFRESH,
    nodeEnv: process.env.NODE_ENV,
    emailApi: process.env.EMAIL,
    passEmail: process.env.EMAIL_PASSWORD
}

export default config