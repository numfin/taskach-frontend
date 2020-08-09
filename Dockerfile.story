FROM node:alpine as build

WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build:story

FROM nginx:alpine as deploy

COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]