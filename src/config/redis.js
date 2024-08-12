// const redis = require("redis");
// const config = require("./config");

// exports.cacheConnection = async () => {
//     try {
//         await redis.createClient({
//             host: config.redisHost,
//             port: config.redisPort,
//         });
//         console.log("Redis Cache connected successfully.");
//     } catch (error) {
//         console.error("Redis connection error:", error);
//     }
// };

// // Generate a function to stop redis
