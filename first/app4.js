let util = require("util");
let event = require("events");


//  basic eventEmitter just like onEventListener, with custom events 👀
const myEmitter = new event.EventEmitter();

myEmitter.on("trigger", () => {
    console.log("an event is emitted");
});

//  emitting/triggering an event
myEmitter.emit("trigger");

//  structure of Person obj
var Person = function(name) {
    this.name = name;
}

util.inherits(Person, event.EventEmitter);

//  creating few peoples, coz that's what Gods do; 🤣
const nik = new Person("Nikhil Kumar Swain");
const sudi = new Person("Sudhanshu Rajdhur");
const adi = new Person("Aditya Anand");

//  list of ppls
const peoples = [nik, sudi, adi];

//  adding events to each person
peoples.forEach((person) => {
    person.on("speak", (msg) => {
        console.log(`${person.name}: ${msg}`);
    });
});

//  emitting events on person 🗣
nik.emit("speak", "Hey Guys, \nWassup");
adi.emit("speak", "Me good, where's @sudi ?!");
sudi.emit("speak", "I'm here too 👀");
nik.emit("speak", "OK then, cyaa 👋🏻");
sudi.emit("speak", "see ya");
adi.emit("speak", "Milte hai phir kbhi");