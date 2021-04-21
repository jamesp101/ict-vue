
FROM mhart/alpine-node:14.16

WORKDIR /app

COPY package*.json ./



RUN npm install
RUN npm run build
RUN npm run generate

COPY . .


EXPOSE 3000 

CMD [ "npm" , "run", "start" ]
