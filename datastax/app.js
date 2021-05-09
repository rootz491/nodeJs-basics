const express = require('express');
const { createClient } = require("@astrajs/rest");

require('dotenv').config()

const app = express();



// create an Astra client
const astraClient = createClient({
  astraDatabaseId: process.env.ASTRA_DB_ID,
  astraDatabaseRegion: process.env.ASTRA_DB_REGION,
  applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
});

const basePath = `/api/rest/v2/namespaces/${process.env.ASTRA_DB_KEYSPACE}/collections/users`;






app.get('/create', (req, res) => {
    
    console.log(req.query.name);

    // create a new user without a document id
    const { data, status } = astraClient.post(basePath, {
        name: req.query.name,
    });

    console.log(data, status);
    res.json({data: data, status: status});
})

















// app.listen(3000);
// console.log('server is running on http://localhost:3000');