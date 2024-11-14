FROM node:20

WORKDIR /app

EXPOSE 3000

ENV SECRET_KEY SECRET_KEY

COPY /src/auth /app/src/auth
COPY /src/common /app/src/common
COPY /src/decks /app/src/decks
COPY /src/role /app/src/role
COPY /src/users /app/src/users
COPY /src/utils /app/src/utils
COPY /src/utils /app/src/utils
COPY /src/app.module.ts /app/src
COPY /src/main.ts /app/src
COPY tsconfig.build.json /app

COPY package.json /app
RUN npm install