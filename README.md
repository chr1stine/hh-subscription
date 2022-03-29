## How to run

1. `docker-compose build`
2. `docker-compose up`

### Environment variables

In order to run services you have to provide following environment varibales:
```
API_KEY=<yout api key>
CLIENT_LOGIN=<your name>
CLIENT_PASSWORD=<your password>
```

## About

Application for a single user, no db. Data is "stored" in api server runtime.

### Client

Web based client made with create-react-app

### API

REST API backend with limited actions: only READ and UPDATE from CRUD actions are availiable on a single subscription resource. Made with Express.js framework for Node.js platform