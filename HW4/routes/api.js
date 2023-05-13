var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const { priceDate, oilType, price } = req.body;
    sql = "INSERT INTO prices (priceDate, oilType, price) VALUES (?, ?, ?)";
    db.run(sql, [priceDate, oilType, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('Inserted');
        return res.status(200).send('Inserted');
    });
});

router.get('/', function(req, res, next) {
    sql = "SELECT * FROM prices";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = router;
