const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  databaseUrl: process.env.DATABASE_URI,
  port: process.env.PORT,
}
