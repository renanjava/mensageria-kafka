FROM node:20

WORKDIR /app

EXPOSE 3000

ENV SECRET_KEY=SECRET_KEY

COPY package.json /app
RUN npm install

COPY ./src/auth /app/src
COPY tsconfig.build.json /app

CMD ["npm", "run", "start"]