//THIS CODE IS FOR STANDARD SERVER
const express = require('express')
const compression = require('compression')
const cors = require('cors')

const app = express()
const config = require('./src/config/config')
const routes = require('./src/routes/noteRoutes')

const { errorHandler } = require('./src/middlewares/errorHandling')
const { connect, databaseConnection } = require('./src/config/database')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('./src/swagger')

app.use(express.json())
app.use(compression())
app.use(cors())
app.use(errorHandler)

// Serve Swagger UI at '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use('/api', routes)

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
  })
})

const startServer = async () => {
  try {
    await databaseConnection()
    app.listen(config.port, () => {
      console.log(`Standard Server is running on port ${config.port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

startServer()
