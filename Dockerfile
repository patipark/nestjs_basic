FROM node:20-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built app from development stage
COPY --from=development /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/main"]
