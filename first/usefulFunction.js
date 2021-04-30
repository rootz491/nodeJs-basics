let counter = function(arr) {
    return `this array has ${arr.length} elements`;
}

let adder = (a, b = 0) => a+b;

const pi = 3.142;

/*  1.  export at the time of creating objects

module.exports.pi = 3.142;
*/

/*  2.  export each object(func/var) one by one as a property of exported object

module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;
*/

/*  3.  export as a single object   */
module.exports = {
    counter: counter,
    adder: adder,
    pi: pi
}