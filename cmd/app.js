const _ = require('lodash');
const yargs = require('yargs');
const { addNote, deleteNote, findNote, listNotes } = require('./notes');

const command = process.argv[2];
const input = yargs.argv;



if(command === 'note') {
    const subCommand = process.argv[3];
    
    if (subCommand === 'add') {
        if (!(_.isString(input.title) && _.isString(input.body))) {
            console.log('enter TITLE or BODY properly');
            process.exit();
        }
        else {
            addNote(input.title, input.body);
        }
    }

    else if (subCommand === 'list') {
        listNotes();
    }

    else if (subCommand === 'find') {
        if (!(_.isString(input.title))) {
            console.error('enter TITLE properly');
            process.exit();
        }
        else
            findNote(input.title);
    }
    
    else if (subCommand === 'delete') {
        if (!(_.isString(input.title))) {
            console.error('enter TITLE properly');
            process.exit();
        }
        else
            deleteNote(input.title);
    }
    
    else if (subCommand === 'dev') {
        console.log('==== Notes - dev 🧨 ====');
        console.log('\n➡  This is basic notes app, that lives in a shell 😁\n➡  All the data will be stored in cloud mongodb cluster, so don\'t  worry about security 😎');
        console.log('\n==== Commands ==== \n');
        console.log('1. add:    \tto add a note to the list; \n\t\texample: node app.js note add --title="sample" --body="1377"\n');
        console.log('2. delete: \tto delete a note using it\'s `title`. \n\t\texample: node app.js note delete --title="sample"\n');
        console.log('3. list:   \tto list all of the notes. \n\t\texample: node app.js note list\n');
        console.log('4. find:   \tto find specific note using it\'s `title`. \n\t\texample: node app.js note find --title="sample"\n');
        console.log('5. dev:    \tto list all of the notes. \n\t\texample: node app.js note dev\n');
        process.exit();
    }

    else {
        console.log('⚠️ undefined note command');
        process.exit();
    }

}
else {
    console.log('☢️ undefined');
    process.exit();
}
