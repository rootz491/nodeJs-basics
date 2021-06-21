const notesCollection = require('./mongodb.js');
let date = new Date();


module.exports = {
    
    addNote: async (title, body) => {
        process.stdout.write("saving");
        setInterval(function(){
            process.stdout.write("#");
        }, 400);
        await notesCollection.insertMany([ {title, body, date} ]);
        console.log('  saved 🔥');
        process.exit();
    },

    listNotes: async () => {
        process.stdout.write("loading");
        setInterval(function(){
            process.stdout.write("#");
        }, 400);
        await notesCollection.find({}, (err, data) => {
            if (err)
                console.log("⚠️ ERR: ", err);
            else {
                console.log('\n==== Notes - dev 🧨 ====\n');
                (data.length > 0)
                ? data.forEach(item => {
                    console.log(`⚡️ ${item.title}\n  ➡  ${item.body}\n`);
                })
                : console.log('Empty List');
            }
        });
        process.exit();
    },

    findNote: async title => {
        process.stdout.write("loading");
        setInterval(function(){
            process.stdout.write("#");
        }, 400);
        await notesCollection.find({title}, (err, data) => {
            if (err)
                console.log("⚠️ ERR: ", err);                
            else {
                console.log('\n==== Notes - dev 🧨 ====\n');
                (data.length > 0)
                ? data.forEach(item => {
                    console.log(`⚡️ ${item.title}\n  ➡  ${item.body}\n`);
                })
                : console.log('Empty List');
            }
        });
        process.exit();
    },

    deleteNote: async title => {
        process.stdout.write("deleting");
        setInterval(function(){
            process.stdout.write("#");
        }, 600);
        await notesCollection.findOne({title}).deleteOne((err, data) => {
            if (err)    console.log("⚠️ ERR: ", err);
        });
        console.log('  deleted 🔥');
        process.exit();
    }

}