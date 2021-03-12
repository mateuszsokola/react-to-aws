FROM nginx 

COPY container /
COPY build /usr/share/nginx/html

ENV API_KEY ''

CMD /bin/bash -c "envsubst '\$API_KEY' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"