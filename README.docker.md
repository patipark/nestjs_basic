# Running the NestJS Application with Docker

This guide explains how to run the NestJS application using Docker with an external database.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine
- External MariaDB database running at 172.19.234.2
- Docker network named "main_public" already created

## Getting Started

1. Clone the repository (if you haven't already)
2. Navigate to the project directory
3. Make sure the "main_public" network exists in Docker:

   ```bash
   docker network ls
   ```

   If it doesn't exist, create it:

   ```bash
   docker network create main_public
   ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reload:

```bash
docker-compose up
```

This will start the NestJS application and connect to the external database.

### Production Mode

To run the application in production mode:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Accessing the Application

- The NestJS API will be available at: `http://localhost:3000/api`
- Swagger documentation will be available at: `http://localhost:3000/api/docs`

## Stopping the Application

To stop the running containers:

```bash
docker-compose down
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues, make sure:

1. The external database at 172.19.234.2 is running and accessible
2. The database credentials in `.env` are correct
3. The Docker container can reach the external database (network connectivity)
4. The "main_public" network is properly configured

### Container Logs

To view logs from the containers:

```bash
# View logs from all containers
docker-compose logs

# View logs from the API container
docker-compose logs api
```

## Building for Production

To build the production Docker image:

```bash
docker build -t nestjs-app:latest .
```
