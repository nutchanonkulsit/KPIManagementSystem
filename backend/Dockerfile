# Use official Node.js image
FROM node:20

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./src ./src

# Expose the port your app listens on
EXPOSE 3000

# Start the server
CMD ["node", "src/server.js"]
