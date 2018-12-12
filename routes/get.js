'use strict';
const Pool = require('pg-pool');
const config = require('../config.json');
//extracts each value from the get file and saves it into its key
//created a config variable, from the .json
//save the object into the config variable
const {table, host, database, user, password, port} = config;
const pool = new Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis: 1000
});

module.exports.getStudents = (event, context, callback) => {
  const selectAllStudents = `SELECT * FROM ${table}`;
  //annon
  pool.connect()
    .then(client => {
      client.release();
      return client.query(selectAllStudents);  
  })
  .then(response=>{
    console.log('response', response);
  })
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    })
  };

  callback(null, response)
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
})

.catch(err => {
   console.log('err', err);
});