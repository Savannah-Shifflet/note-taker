const notes = require('express').Router();
const fs = require('fs');


notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});


module.exports = notes;