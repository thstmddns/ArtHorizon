FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --silent
COPY . /usr/src/app
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]