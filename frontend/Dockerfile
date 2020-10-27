# => Run container
FROM nginx:1.19.2-alpine

# Nginx config
COPY ./proxy/default.conf /etc/nginx/templates/default.conf.template

# Static build
COPY ./apps/webapp/build/ /var/www/

# Set default env vars
ENV SPROUT_API_URL=http://localhost:8080
ENV PORT=3000
