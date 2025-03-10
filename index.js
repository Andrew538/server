require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const https = require('https');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 7000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)
// https 
// .createServer(app)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Сервер запущен на порту', `${PORT}`))
        
    } catch (error) {
        console.log(error)
    }
}

start()