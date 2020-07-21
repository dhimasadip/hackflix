FROM node:12.0

WORKDIR /var/www/entertainme/server/orchestrator

ENV PORT=3000

COPY package.json ./

RUN npm i -g nodemon

RUN npm i && npm cache clean --force

COPY . .

CMD ["nodemon", "app.js"]