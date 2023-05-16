const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    const bufferedData = fs.readFileSync("notes.json");
    return JSON.parse(bufferedData);
  } catch (e) {
    return [];
  }
};

const saveNote = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log("Title: ", note.title);
    console.log("Description: ", note.body);
  });
};
const addNote = (title, body) => {
  const notes = loadNotes();
  const filteredNotes = notes.find((note) => note.title === title);

  if (!filteredNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNote(notes);
    console.log(chalk.green.inverse("Note Added"));
  } else {
    console.log(chalk.yellow("Note already exists!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
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
  listNotes: listNotes,
};
