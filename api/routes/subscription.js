const express = require('express');
const router = express.Router();
let config = require('../data/config');
require('dotenv').config();

function authenticate(req) {
  try{
    const Authorization = req.headers['authorization'];
    const apiKey = Authorization.match(/Basic\s(.*)/)[1];
    if (apiKey === process.env.API_KEY){
      return true;
    }else{
      return false;
    }
  }catch(error){
    return false;
  }
}

router.get('/', (req, res) => {
  if (!authenticate(req)) {
    res.status(401).send('error: unauthorized');
  } else {
    res.status(200).send({config});
  }
});

router.put('/', (req, res) => {
  if (!authenticate(req)){
    res.status(401).send('error: invalid api key');
  } else{
   config = req.body.config;
   res.status(204).send('successfully changed subscription config');
  }
});

module.exports = router;
