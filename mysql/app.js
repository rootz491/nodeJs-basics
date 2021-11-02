const express = require('express');
const morgan = require('morgan');
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

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => {
    try {
        connection.query('SELECT * FROM pet', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    } catch (error) {
        res.status(403).send(error);
    }
});

app.post('/pet', (req, res) => {
    try {
        const {
            name, 
            owner, 
            species,
            sex
        } = req.body;
        
        connection.query(`INSERT INTO pet VALUES ('${name}', '${owner}','${species}','${sex}')`, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    } catch (error) {
        res.status(403).send(error);
    }
});

app.get('/pet', (req, res) => {
    try {
        const { owner } = req.query;
        
        connection.query(`SELECT * FROM pet WHERE owner='${owner}'`, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    } catch (error) {
        res.status(403).send(error);
    }
});

app.listen(3000);