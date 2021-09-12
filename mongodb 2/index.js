#!/usr/local/bin/node

const argv = require('yargs').argv;
const mongoose = require('mongoose') 
require('dotenv').config()




//  Animals data model
const animalSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    list: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Creature' } ],
    date: {
        type: Date,
        default: new Date().getTime()
    }
});

const Animal = mongoose.model("Animal", animalSchema);


//  creature
const creatureSchema = mongoose.Schema({
    animalGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

const Creature = mongoose.model("Creature", creatureSchema);


//  connect to database
const initDB = async () => {
    try {
        console.log('wait, connecting to DB');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to db');
    } catch (error) {
        console.log('error while connecting to db: ', error);
    }
}

const start = async () => {
    //  initialize db before actually going thru command
    await initDB();

    // console.log(argv)
    switch(argv.action) {   /*  ./index.js --action xyz     */
        
        case 'show':
            //  choose b/w `Animal` and `creature`
            switch(argv.type) {
                case "animal":  //  show Animal
                    try {
                        if (argv.name) {    //  show Animal & it's creatures by 'name'
                            let animal = await Animal.findOne({ name: argv.name }).populate('list');     /* ./index.js --action show --type animal --name Dog */
                            //  show to console
                            console.log(`name: ${animal.name}`);  //  print animal name
                            // console.log(` data: ${animal.date}`);
                            console.log('   List of animals:');
                            let creatures = animal.list;
                            creatures.length > 0 ?
                                creatures.forEach((creature, j) => {        //  go thru each creature belongs to that animal
                                    console.log(`\t${j}. ID: ${creature._id}`);
                                    console.log(`\t   name: ${creature.name}`);
                                    console.log(`\t   age: ${creature.age}`);           /* print details of each creature */
                                    console.log(`\t   color: ${creature.color}`);
                                }) :
                                console.log('/tNo creatuers found');
                        }
                        else {  //  show all animals and it's creatures
                            let animals = await Animal.find().populate('list');     /* ./index.js --action show --type animal */
                            //  show to console
                            animals.forEach((animal, i) => {    //  go thru each animal
                                console.log(`${i}. name: ${animal.name}`);  //  print animal name
                                // console.log(` data: ${animal.date}`);
                                console.log('   List of animals:');
                                let creatures = animal.list;
                                creatures.length > 0 ?
                                    creatures.forEach((creature, j) => {        //  go thru each creature belongs to that animal
                                        console.log(`\t${j}. ID: ${creature._id}`);
                                        console.log(`\t   name: ${creature.name}`);
                                        console.log(`\t   age: ${creature.age}`);           /* print details of each creature */
                                        console.log(`\t   color: ${creature.color}`);
                                    }) :
                                    console.log('\tNo creatuers found');
                            });
                        }
                    } catch (error) {
                        console.log('⚠️ Failed to fetch animal!');
                    }
                    break;
                case "creature":    //  show Creature
                    try {
                        let creatures = await Creature.find().populate('animalGroup')
                        //  show to console
                        creatures.forEach((creature, i) => {    //  go thru each creature
                            console.log(`${i}. name: ${creature.name}`);  /* print details of creature */
                            console.log(`   age: ${creature.age}`);
                            console.log(`   color: ${creature.color}`);
                            console.log(`   animal type: ${creature.animalGroup.name}`);    //  print which animal this creature belongs to.
                        })
                    } catch (error) {
                        console.log('⚠️ Failed to fetch creature!');
                    }
                    break;
                default:
                    console.log('⚠️ choose `--type` b/w animal or creature');
            }
            break;


        case 'add':
            //  choose b/w `Animal` and `creature`
            switch(argv.type) {
                case "animal":  //  add `Animal`
                    try {
                        let newAnimal = new Animal();       /* ./index.js --action add --type animal --name Dog */
                        newAnimal.name = argv.name;
                        newAnimal.list = [];
                        await newAnimal.save();
                        console.log('Animal ' + argv.name + ' is created!');
                    } catch (error) {
                        console.log('⚠️ Failed to create new animal!');
                    }
                    break;
                case "creature":    //  add Creature
                    try {
                        let newCreature = new Creature();   /* ./index.js --action add --type creature --name carrey --age 2 --color "black and brown" --animalGroup 613e168ca6261851127834a9 */
                        newCreature.name = argv.name;
                        newCreature.age = argv.age;
                        newCreature.animalGroup = argv.animalGroup;
                        newCreature.color = argv.color;
                        await newCreature.save();
                        console.log('Creature ' + argv.name + ' is created!');
                    } catch (error) {
                        console.log('⚠️ Failed to create new creature!');
                    }
                    break;
                default:
                    console.log('⚠️ choose `--type` b/w animal or creature');
            }
            break;

        case 'remove':
            console.log('hope you\'ll it again someday');
            break;
        case 'help':
            console.log('do it youself XD');
            break;
        default:
            console.log('go fuck youself!');
    }
    process.exit();
}


start()