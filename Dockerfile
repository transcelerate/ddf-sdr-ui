FROM nginx:latest
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html
RUN echo $(ls -1 /usr/share/nginx/html)
EXPOSE 80