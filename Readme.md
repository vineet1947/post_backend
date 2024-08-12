# Notes for Marbel Health Microservice

This repository contains the Notes Microservice, built with Node.js, Express, and MongoDB. It supports deployment as a standalone Express server for Marble Health Screening.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)

## Deployment

### Standalone Express Server

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Configure MongoDB URI:**

   Create a `.env` file in the root directory and add your MongoDB connection URI:

   ```
   MONGODB_URI=your-mongodb-uri
   ```

3. **Start the Server:**

   ```bash
   npm run dev
   ```

   Access the application at `http://localhost:3000`.
   Access the Swagger documentation at `http://localhost:3000/api-docs`.

### Docker Build

1. **Build and Deploy Docker Container:**

   ```bash
   docker build -t your-image-name .
   ```

2. **Run Docker Container:**

   ```bash
   docker run -p 3000:3000 --env-file .env your-image-name
   ```

## Development

To apply code changes, just save the file and `nodemon` will automatically restart the server:

```bash
npm run dev
```
