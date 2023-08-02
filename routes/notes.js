const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    console.log(req.body);

    const { title, text } = req.body;
    
    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully!`);
    } else {
        res.error('Error in adding note');
    };
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json').then((data) => {
        const noteList = JSON.parse(data);
        const updatedList = noteList.filter((note) => note.id !== noteId); 
        writeToFile('./db/db.json', updatedList); 
        res.json(`Note ${noteId} has been deleted 🗑️`);
    });
});

module.exports = notes;