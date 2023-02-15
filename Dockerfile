ARG NODE_VERSION=18.14

# "development" stage
FROM node:${NODE_VERSION}-alpine as api_development

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma
COPY .env ./
COPY tsconfig.json ./

RUN npm ci
RUN npx prisma generate

COPY . ./

CMD [ "npm", "run", "start:dev" ]


# "build" stage
FROM api_development as api_build

RUN npm run build

CMD [ "npm", "run", "start:prod" ]