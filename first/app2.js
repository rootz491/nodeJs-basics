var time = 0;

const timer = setInterval(() =>{
    time += 2;
    console.log(time + " seconds have been passed!");
    if (time > 5)
        clearInterval(timer);
}, 2000);


console.log(__dirname);
console.log(__filename);