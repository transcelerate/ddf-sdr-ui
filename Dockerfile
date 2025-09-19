FROM node:16-alpine AS build

WORKDIR /app

# Install Depenencies and cache them first
COPY SDR-WebApp/package*.json ./
COPY SDR-WebApp/vendor/ ./vendor
RUN npm ci

# Copy the angular code and build
COPY SDR-WebApp/. .

# Replace tokens in environment.ts
ARG ENV_NAME
RUN sed -i 's|{#Env-Name#}|'"${ENV_NAME}"'|g' src/environments/environment.ts
RUN npm run build --production

# Copy the script to inject ENV variables to the web app
COPY docker-inject-app-envs.sh .


FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/SDR-WebApp /usr/share/nginx/html

# Perform a substitution of environemnt variables into the wep app (e.g. API URL)
RUN apt-get update
RUN apt-get install -y jq
COPY --from=build /app/docker-inject-app-envs.sh /docker-entrypoint.d/docker-inject-app-envs.sh
RUN chmod +x /docker-entrypoint.d/docker-inject-app-envs.sh

EXPOSE 80