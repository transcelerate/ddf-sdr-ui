FROM node:16-alpine AS build

WORKDIR /app

# Install Depenencies and cache them first
COPY SDR-WebApp/package*.json ./
COPY SDR-WebApp/vendor/ ./vendor
RUN npm ci

# Copy the angular code and build
COPY SDR-WebApp/. .
RUN npm run build --production


FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/SDR-WebApp /usr/share/nginx/html

EXPOSE 80