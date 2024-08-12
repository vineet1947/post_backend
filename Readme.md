# Notes for Marbel Health Microservice

This repository contains the Notes Microservice, built with Node.js, Express, and MongoDB. It supports deployment as a standalone Express server for Marble Health Screening.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)

## Deployment

### Standalone Express Server

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm run dev
   ```

   Access the application at `http://localhost:3000`.
    Access the sawgger application at `http://localhost:3000/api-docs`.

### Docker Build

1. Build and deploy your Docker container:

   ```bash
   docker build -t your-image-name .
   ```

## Development

To apply code changes, just save the file nodemon will take care

```bash
npm run dev
```
