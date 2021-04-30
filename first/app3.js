//  we created a modeule `usefulFunction` and used it's functions here!

const usefulFunction = require("./usefulFunction");

console.log(usefulFunction.counter(["Aditya", "Sudi", "Nik", "Raushan"]));
console.log(`sum of 2 numbers is ${usefulFunction.adder(5, 7)}`);
console.log(`sum of Pi with nothing is ${usefulFunction.adder(usefulFunction.pi)}`);
