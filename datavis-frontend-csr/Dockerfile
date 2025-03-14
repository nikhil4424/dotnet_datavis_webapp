# https://levioconsulting.com/insights/how-to-dockerize-an-angular-application-with-nginx/
# https://jonathanantoine.medium.com/hosting-an-angular-application-inside-a-docker-container-with-nginx-b10f3f0a4c26

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest AS build

# Set the working directory
WORKDIR /app
# Install angular
RUN npm install -g @angular/cli

# Copy and install dependencies
COPY package*.json .
RUN npm clean-install

# Add the source code to app
COPY . .

# Generate the build of the application
RUN npm run build --configuration=production


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:stable AS final
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy the build output
COPY --from=build app/dist/datavis-frontend-csr/browser .

ENTRYPOINT ["nginx", "-g", "daemon off;"]