const express = require('express');
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.username,
    password: process.env.password,
    server: process.env.server,
    database: process.env.database,
    port: 3306    
}


const pool1 = new sql.ConnectionPool(config);
pool1.connect()
    .then(_ => console.log('connected to sql'))
    .catch(err => console.log('error while connecting: ', err));


const app = express();

// app.get('/', (req, res) => {

//     res.end();
// })


app.listen(3000);