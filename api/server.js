require('dotenv').config();
var cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors({origin: '*'}));

const subscriptionRouter = require('./routes/subscription');
app.use('/subscription', subscriptionRouter);

app.listen(5000, () => console.log('server started'));
