# Backend Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source files
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]