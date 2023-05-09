const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log('Title: '+ argv.title);
        console.log("Description: "+ argv.body);
    }
})

yargs.parse()
