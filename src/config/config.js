const env = require("dotenv");

module.exports = {
    databaseUrl: process.env.DATABASE_URI,
    port: process.env.PORT,
};
