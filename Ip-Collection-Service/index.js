const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const request = require('request');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Generates a random IP address to be found
function generateIP(min, max) {
    let num1;
    do {
        num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        // Private IP range
    } while (num1 === 10 || num1 === 172 || num1 === 192);
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    let num3 = Math.floor(Math.random() * (max - min + 1)) + min;
    let num4 = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${num1}.${num2}.${num3}.${num4}`
}

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'origin',
    database: 'ips'
});

setInterval(() => {
    const ip = generateIP(11, 200);
    // Gets Lat Long from IP address
    request(`http://extreme-ip-lookup.com/json/${ip}`, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            const parsed = JSON.parse(body);
            if (parsed.lon && parsed.lat) {
                console.log('got', ip, 'correctly!', parsed.lon, parsed.lat);
                const sql = `INSERT INTO iplocations (ip, lon, lat) VALUES ('${ip}','${parsed.lon}','${parsed.lat}') ON DUPLICATE KEY UPDATE ip='${ip}'`;
                connection.query(sql, function (err, rows, fields) {
                    if (err) throw err;
                });
            } else {
                console.log(`IP ${ip} not found`);
            }
        }
    });
}, 500)

app.get("/", async function (req, res) {
    // Returns all IP data to caller
    await connection.query('SELECT * FROM iplocations', function (err, rows, fields) {
        res.status(200).send(rows);
    });
});

app.listen(port, () => {
    console.log("Listening on port", port);
});