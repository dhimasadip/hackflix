FROM node:12.0

WORKDIR /var/www/entertainme/server/services/movies

ENV PORT=3001

COPY package.json ./

RUN npm i -g nodemon

RUN npm i && npm cache clean --force

COPY . .

CMD ["nodemon", "app.js"]