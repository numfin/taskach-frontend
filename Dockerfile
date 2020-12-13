ARG API_URL

FROM node:alpine as build

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci

COPY . .
ENV API_URL=${API_URL}
RUN npm run build

FROM nginx:alpine as deploy

COPY --from=build /usr/app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf