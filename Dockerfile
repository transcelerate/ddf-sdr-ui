FROM nginx
COPY . /usr/share/nginx/html
CMD ls -l
