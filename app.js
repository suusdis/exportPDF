const express = require('express');
const bodyParser = require('body-parser');


const login = require('./helpers/Login');
const file = require('./helpers/file');
const pdfServicesRoutes = require('./routes/pdfServices');
const azureRoutes = require('./routes/azure');

const app = express();

app.use(bodyParser.json()) // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log();
   
    async function f1(req, res) {
        let env = req.headers["host"];
        let authorization = req.headers["authorization"];
        let contentType = req.headers["content-type"];

        const auth  = await login(env, authorization, contentType);   
         if(auth == true){
            next();
        }
        else{
            return res.status(401).json({
                code: 401,
                message: 'No authorization',
            });
        }
      }  
    f1(req, res);
});


/*
    SUCCESS = 200, 
    INVALID = 400, 
    NO_AUTHORISATION = 401, 
    FORBIDDEN = 403, 
    NOT_FOUND = 404, 
    UNCAUGHT_ERROR = 500 
*/
   
// Set base route path
app.use('/pdf', pdfServicesRoutes);

app.use('/azure', azureRoutes);

module.exports = app;
