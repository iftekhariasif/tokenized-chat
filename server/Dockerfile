# Use the official Node.js 14 image as the base image
FROM node:18


# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 4000 to the outside once the container has launched
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "start:prod"]
