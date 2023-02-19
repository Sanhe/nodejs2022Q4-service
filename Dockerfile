ARG NODE_VERSION=18.14
ARG ALPINE_VERSION=3.17

# "development" stage
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as api_development

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start:dev" ]


# "build" stage
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as api_production

WORKDIR /usr/app
ENV NODE_ENV production

COPY package*.json ./
COPY .env ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=api_development /usr/app/doc/api.yaml ./doc/api.yaml
COPY --from=api_development /usr/app/dist ./dist
COPY --from=api_development /usr/app/prisma ./prisma
COPY --from=api_development /usr/app/node_modules/.prisma ./node_modules/.prisma

CMD [ "npm", "run", "start:prod" ]