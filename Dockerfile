FROM oven/bun:1.0-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENV NGINX_HOST=localhost
ENV NGINX_PORT=80

CMD ["nginx", "-g", "daemon off;"]
