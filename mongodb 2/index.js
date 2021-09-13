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
                            console.log(`id: ${animal._id}`);   //  print animal info
                            console.log(`name: ${animal.name}`);
                            console.log('   List of animals:');
                            let creatures = animal.list;
                            creatures.length > 0 ?
                                creatures.forEach((creature, j) => {        //  go thru each creature belongs to that animal
                                    console.log(`\t${j}. ID: ${creature._id}`);
                                    console.log(`\t   name: ${creature.name}`);
                                    console.log(`\t   age: ${creature.age}`);           /* print details of each creature */
                                    console.log(`\t   color: ${creature.color}`);
                                }) :
                                console.log('\t⚠️ No creatuers found');
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
                            console.log(`${i}. ID: ${creature._id}`);  /* print details of creature */
                            console.log(`   name: ${creature.name}`);
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
            //  choose b/w `Animal` and `creature`
            switch(argv.type) {
                case "animal":  //  remove `Animal`
                    if (argv.name) {
                        try {   /* ./index.js --action remove --type animal --name cat */
                            const deletedAnimal = await Animal.findOneAndDelete({name: argv.name});
                            if (deletedAnimal) console.log('Animal successfully deleted!');
                            else console.log('Can\'t remove Animal, perhaps it doesn\'t exist!');
                        } catch (error) {
                            console.log('⚠️ Failed to delete your animal!');
                        }
                    }
                    else {
                        console.log('⚠️ specify name of animal you want to delete with `--name` flag');
                    }
                    break;
                case "creature":    //  remove `Creature`
                    if (argv.name) {
                        try {       /* ./index.js --action remove --type creature --name carrey */
                            const deletedCreature = await Creature.findOneAndDelete({name: argv.name});
                            if (deletedCreature) console.log('Creature successfully deleted!');
                            else console.log('Can\'t remove Creature, perhaps it doesn\'t exist!');
                        } catch (error) {
                            console.log('⚠️ Failed to create new animal!');
                        }
                    }
                    else {
                        console.log('⚠️ specify name of creature you want to delete with `--name` flag');
                    }
                    break;
                default:
                    console.log('⚠️ choose `--type` b/w animal or creature');
            }
            break;

        case 'push':
            if(argv.type === 'animal') {    //  push to specific `Animal` list to add new `creature` into it.
                if (argv.id && argv.creature) {  //  check if `id` is passed and `creature` is passed
                    try {
                        const updatedAnimal = await Animal.findByIdAndUpdate(argv.id, { $push: { list: argv.creature } });
                        if (updatedAnimal) console.log('new creature added to your animal list!\n');
                        else console.log('Can\'t update Animal, perhaps it doesn\'t exist!');
                    } catch (error) {
                        console.log('⚠️ Failed to update your animal! -> ', error.message);
                    }
                }
                else {
                    console.log('⚠️ specify animal you want to update with `--id` flag and provide id of creature you want to add with `--creature` flag');
                }
            }
            else console.log('⚠️ you can only update `animal` to add new creature into animal\'s list.');
            break;
        
        case 'pop':
            if(argv.type === 'animal') {    //  pop last creature from `Animal` list.
                if (argv.id) {  //  check if `id` is passed
                    try {       /* ./index.js --action pop --type animal --id 613e168ca6261851127834a0 */
                        const updatedAnimal = await Animal.findByIdAndUpdate(argv.id, { $pop: { list: 1 } });
                        if (updatedAnimal) console.log('creature is popped from your animal list!\n');
                        else console.log('Can\'t pop creature from animal list, perhaps it doesn\'t exist!');
                    } catch (error) {
                        console.log('⚠️ Failed to update your animal! -> ', error.message);
                    }
                }
                else {
                    console.log('⚠️ specify animal you want to update with `--id` flag');
                }
            }
            else console.log('⚠️ you can only update `animal` to remove last creature from animal\'s list.');
            break;

        case 'help':
            console.log('Go read source code & do it youself xD');
            break;

        default:
            console.log('select an action with `--action` flag.');

    }
    process.exit(); //  kill process
}


start()