# # Step 1: Build the Angular app
# FROM node:20 AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json first to leverage caching
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the app
# COPY . .

# # Build the Angular app for production
# RUN npm run build --prod

# # Step 2: Serve the app with Nginx
# FROM nginx:alpine

# # Copy the built files from the builder stage
# COPY /dist/frontend /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Optionally, copy custom Nginx configuration
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build Angular app
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Note the correct path to index.html
COPY --from=build /app/dist/kpimangement-system/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
