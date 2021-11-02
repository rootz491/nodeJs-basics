const express = require('express');
const sql = require('mysql2');
require('dotenv').config();

const config = {
    user: process.env.username,
    password: process.env.password,
    host: process.env.server,
    database: process.env.database,
    port: 3306    
}

const connection = sql.createConnection(config);

connection.connect();


const app = express();


app.get('/', (_, res) => {
    try {
        connection.query('SELECT * FROM pet', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    } catch (error) {
        res.status(403).send(error);
    }
})


app.listen(3000);