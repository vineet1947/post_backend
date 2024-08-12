const mongoose = require("mongoose");
const config = require("./config");

exports.databaseConnection = async () => {
    try {
        await mongoose.connect(config.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};
