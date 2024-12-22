# Use an official Node.js image as the base image
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Use an official Nginx image to serve the frontend
FROM nginx:stable-alpine

# Copy the built application to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration, if needed
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
