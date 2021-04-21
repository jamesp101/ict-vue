
FROM mhart/alpine-node:14.16

WORKDIR /app

COPY package*.json ./


COPY . .

RUN npm install
RUN npm run build
RUN npm run generate



EXPOSE 3000 

CMD [ "npm" , "run", "start" ]
