# https://medium.com/@nadir.inab.dev/dockerizing-your-angular-app-a-quick-guide-00a3ecabe419

# https://github.com/docker/awesome-compose/blob/master/angular/angular/Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:alpine as build

# Set the working directory
WORKDIR /app

RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install -g @angular/cli
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
# RUN npm run build --prod
RUN ng build --configuration=production

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the built Angular application to the Nginx HTML directory
COPY --from=build /app/dist/datavis-frontend-csr /usr/share/nginx/html


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]