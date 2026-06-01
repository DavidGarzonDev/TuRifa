# Nginx Reverse Proxy - TuRifa
FROM nginx:1.27-alpine

RUN apk add --no-cache gettext

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Default values (override via Dokploy environment variables)
ENV PORT=8443
ENV SERVER_NAME=localhost
ENV BACKEND_UPSTREAM=turifa-backend:3000
ENV FRONTEND_UPSTREAM=turifa-frontend:80

EXPOSE ${PORT}

CMD ["/bin/sh", "-c", "envsubst '$PORT $SERVER_NAME $BACKEND_UPSTREAM $FRONTEND_UPSTREAM' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]