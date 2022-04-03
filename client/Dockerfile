FROM node:14 as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

FROM base as development
CMD [ "npm","start" ]

FROM base as production
RUN npm install -g serve
RUN npm run build
CMD ["sh", "-c", "serve -n -s build -l 3000"]