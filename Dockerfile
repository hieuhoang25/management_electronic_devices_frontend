# Specify the base image
FROM node:16.15.0-alpine

# Install yarn
RUN apk add --no-cache yarn

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

COPY env.development /app/.env

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]