const express = require('express');
const morgan = require('morgan');
// const sql = require('mssql');
const sql = require('mysql2');
require('dotenv').config();

const SQL_CONNECTION_STRING = `Server=tcp:rootz491.database.windows.net,1433;Initial Catalog=prisma-learning;Persist Security Info=False;User ID=rootz491;Password=${process.env.PASSWORD};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`;

const app = express();

const config = {
    host: process.env.HOST,
    database: process.env.DBNAME,
    port: 5432,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
}

// mysql

// const connection = sql.createConnection(config);
// connection.connect(x => console.log(x));

const connection = sql.createPool(config)
// console.log(connection)

// mssql

// sql.connect(config)
// sql.connect('Server=prisma-learning.postgres.database.azure.com;Database=test;Port=5432;User Id=rootz491@prisma-learning;Password=Javascript1!;Ssl Mode=Require;')
    // .then(x => console.log('connected to db: ', x))
    // .catch(err => console.log(err));

app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    try {
        connection.query("SHOW TABLES", function (error, results) {
            if (error) throw error
            console.log('Result: ', results);
            res.send(results);
        });     
    } catch (error) {
        console.log('Error: ', error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});