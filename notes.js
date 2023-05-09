const fs = require("fs");
const chalk = require("chalk");

const loadNotes = function () {
  try {
    const bufferedData = fs.readFileSync("notes.json");
    return JSON.parse(bufferedData);
  } catch (e) {
    return [];
  }
};

const saveNote = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const filteredNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (filteredNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNote(notes);
  } else {
    console.log(chalk.yellow("Note already exists!"));
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const filteredNotes = notes.filter(function (note) {
    return note.title !== title;
  });
  if (filteredNotes.length === notes.length) {
    console.log(chalk.red(`Note with title ${title} doesn't exist!`));
  } else {
    saveNote(filteredNotes);
    console.log(chalk.green(`Note removed of tiltle: ${title}`));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
};
