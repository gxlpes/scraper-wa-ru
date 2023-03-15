FROM node:18 as build

WORKDIR /app

COPY package.json app.ts tsconfig.json ./

COPY /baileys_auth ./baileys_auth

COPY /src ./src

RUN npm install
RUN npm cache clean -f

RUN npm run build

FROM node:18 as production

WORKDIR /app

COPY  --from=build app/dist ./
COPY  --from=build app/node_modules ./node_modules
COPY  --from=build app/baileys_auth ./baileys_auth

CMD [ "node", "app.js" ]