FROM node:alpine as build

WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine as deploy

COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]