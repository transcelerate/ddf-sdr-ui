FROM nginx:latest
COPY . /usr/share/nginx/html
RUN echo $(ls -1 /usr/share/nginx/html)
EXPOSE 80
