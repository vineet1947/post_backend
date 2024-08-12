const compression = require("compression");
const cors = require("cors");
const express = require("express");
const { createAzureFunctionHandler } = require("azure-function-express");
const exampleRoutes = require("./src/routes/LeaderboardRoutes");
const { databaseConnection } = require("./src/config/database");
const { errorHandler } = require("./src/middlewares/errorHandling");

const app = express();
app.use(compression());
app.use(cors());
app.use(errorHandler);

app.use("/api", exampleRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
    });
});

const startConnection = async () => {
    try {
        console.log(`Azure Function App Service is being prepared...`);
        await databaseConnection();
    } catch (error) {
        console.error("Failed to start connection:", error);
    }
};

startConnection();
const azureFunctionHandler = createAzureFunctionHandler(app);

module.exports = azureFunctionHandler;
