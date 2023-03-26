# Base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm audit fix --force

# Copy the rest of the application files to the container
COPY . .

COPY .env.production .env

# Build the application
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["npm", "start"]