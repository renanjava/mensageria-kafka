FROM node:20

WORKDIR /app

EXPOSE 3000

#ENV SECRET_KEY=SECRET_KEY

COPY . /app

COPY package.json /app
RUN npm install

CMD ["npm", "run", "start"]