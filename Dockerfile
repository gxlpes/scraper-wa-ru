FROM node:18.14.0-alpine as build

WORKDIR /app

COPY package*.json tsconfig.json app.ts ./

RUN npm install

COPY /src ./src

COPY /baileys_auth ./baileys_auth

RUN npm run build

FROM node:18.14.0-alpine as production

WORKDIR /app/prod 

COPY  --from=build app/dist ./
COPY  --from=build app/node_modules ./node_modules
COPY  --from=build app/baileys_auth ./baileys_auth

CMD [ "node", "app.js" ]
