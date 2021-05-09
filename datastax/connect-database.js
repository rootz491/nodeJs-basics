let { Client } = require('cassandra-driver');

async function run() {
    const client = new Client({
        cloud: {
            secureConnectBundle: __dirname + "/secure-connect-learning.zip",
        },
        credentials: {
            username: "oSkPgWlQmxPEjyQtYSUdEmrC",       //  client ID
            password: "fC1PXHCohaQWNMDhqG2McGmFw_jNWeEe-UstDTr.hO0aH2gZQavsD2gOWw--szcpK-_y3X0Fw-nXSqjbROdTJlqYMSjZU1PC2MP8xxyt2-2gDJsGdqZR,qSZm.Kb_Esb",   //  client secret
        },
    });
    
    await client.connect();
    
    // Execute a query
    const rs = await client.execute("SELECT * FROM system.local");
    console.log(`Your cluster returned ${rs.rowLength} row(s)`);
    
    await client.shutdown();
    }
    
    // Run the async function
    run();