FROM node:20.18.0-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install


FROM node:20.18.0-alpine AS production

COPY . .

COPY --from=build /app .

EXPOSE 3000

CMD ["npm", "run", "start"]