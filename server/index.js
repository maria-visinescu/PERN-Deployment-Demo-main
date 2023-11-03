const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create express app
const app = express();
const port = 5000;

const cors = require("cors");

const corsOptions = {
  origin: "http://127.0.0.1:3000",
};

app.use(cors(corsOptions));


// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});
	 	 	 	
app.get('/name', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const data = {name: 'Leah'};
    res.send(data);
});

app.get('/user', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    teammembers = []
    pool
        .query('SELECT * FROM teammembers_jungin;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            console.log(teammembers);
            res.send(data)
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
