let num = 21341;
let den = 4;
let quotient = 0;

let num_cp = num;
while (num >= den) {
    num = num - den;
    quotient++;
}

console.log(`${num_cp} / ${den} = ${quotient}\ncorrect answer is ${ Math.round(num_cp/den) }\nTherefore, your answer is ${ Math.round(num_cp/den) === quotient }`);
