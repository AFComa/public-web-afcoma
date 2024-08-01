# etapa de compilación
FROM node:20 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

# etapa de producción
FROM nginx:stable-alpine as production-stage

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
