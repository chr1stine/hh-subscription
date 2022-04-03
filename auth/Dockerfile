FROM node:12 as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM base as development
CMD ["sh","-c","npm start"]

FROM base as production
CMD ["sh","-c","npm run build"]
