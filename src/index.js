const express = require('express')
const app = express()
const config = require('./config/config')
const connectDB = require('./config/connection-db')
const handlerError = require('./middlewares/handlerErrors')
const taskRouter = require('./routes/taskRouter')

app.use(express.json())

connectDB()

app.use('/api/tasks', taskRouter)

app.use(handlerError)

app.listen(config.port, () => {
    console.log(`Api encendida en el puerto ${config.port}`)
})