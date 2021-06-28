'use strict';

const express = require('express');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middlewares/logger');
const validator = require('./middlewares/validator');

const app = express();

app.get('/person',validator, (req,res)=>{
  const name = req.query.name;

  res.status(200).json({name: name});
})

app.use('*',notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start:(port)=>{
    app.listen(port,()=> console.log(`Listening on ${port}`))
  }
}