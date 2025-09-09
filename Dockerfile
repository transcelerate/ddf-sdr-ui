FROM node:16-alpine AS build

WORKDIR /app

# Install Depenencies and cache them first
COPY SDR-WebApp/package*.json ./
COPY SDR-WebApp/vendor/ ./vendor
RUN npm ci

# Copy the angular code and build
COPY SDR-WebApp/. .

# Replace tokens in environment.ts
ARG BASE_URL
ARG ENV_NAME
RUN sed -i 's|{#Api-BaseUrl#}|'"${BASE_URL}"'|g' src/environments/environment.ts
RUN sed -i 's|{#Env-Name#}|'"${ENV_NAME}"'|g' src/environments/environment.ts
RUN npm run build --production


FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/SDR-WebApp /usr/share/nginx/html

EXPOSE 80