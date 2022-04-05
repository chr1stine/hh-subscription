FROM node:12 as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

FROM base as development
CMD [ "npm","start" ]

FROM base as production
CMD [ "npm","run","build" ]