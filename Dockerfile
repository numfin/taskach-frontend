FROM node:alpine as build

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm run build:story

FROM nginx:alpine as deploy

COPY --from=build /usr/app/public/ /usr/share/nginx/html/app/
COPY --from=build /usr/app/storybook-static/ /usr/share/nginx/html/storybook/
COPY nginx.conf /etc/nginx/conf.d/default.conf