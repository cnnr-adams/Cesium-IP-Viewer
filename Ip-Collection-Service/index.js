const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3000;
const request = require('request');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function generateIP(min, max) {
    let num1;
    do {
        num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num1 === 10 && num1 === 172 && num1 === 192);
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

const server = app.listen(port, () => {
    console.log("listening on port", port);
});

setInterval(() => {
    const ip = generateIP(11, 200);
    request(`http://extreme-ip-lookup.com/json/${ip}`, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            const parsed = JSON.parse(body);
            if (parsed.lon && parsed.lat) {
                console.log('got', ip, 'correctly!', parsed.lon, parsed.lat);
                const sql = `INSERT INTO iplocations (ip, lon, lat) VALUES ('${ip}','${parsed.lon}','${parsed.lat}') ON DUPLICATE KEY UPDATE ip='${ip}'`;
                connection.query(sql, function (err, rows, fields) {
                    // console.log('here');
                    if (err) throw err;
                    //console.log(rows, fields);
                });
            } else {
                console.log(`bad ip ${ip}`);
            }
        }
    });
}, 500)
app.use(cors());
var appRouter = function (app) {
    app.get("/", async function (req, res) {
        await connection.query('SELECT * FROM iplocations', function (err, rows, fields) {
            res.status(200).send(rows);
        });
    });
}

appRouter(app);
