
const cacheMiddleware = async (req, res, next) => {
    const cacheKey = `cache:${req.originalUrl}`;
  
    await client.get(cacheKey, (err, cachedData) => {
      if (err) throw err;
  
      if (cachedData) {
        res.send(JSON.parse(cachedData));
      } else {
        res.originalSend = res.send;
        res.send = (data) => {
          client.set(cacheKey, data, 'EX', 60); // Set cache expiration time (in seconds)
          res.originalSend(data);
        };
        next();
      }
    });
  };

module.exports = cacheMiddleware;