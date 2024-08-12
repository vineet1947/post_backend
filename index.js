const compression = require("compression");
const cors = require("cors");
const express = require('express')

const exampleRoutes = require('./src/routes/PostRoutes')

const { databaseConnection } = require('./src/config/database')
const { errorHandler } = require('./src/middlewares/errorHandling')

const app = express()
app.use(compression())
app.use(cors())
app.use(errorHandler)

app.use('/api', exampleRoutes)

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
  })
})

const startConnection = async () => {
  try {
    await databaseConnection()
  } catch (error) {
    console.error('Failed to start connection:', error)
  }
}

startConnection()
