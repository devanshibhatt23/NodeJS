const fs = require("fs")

// blocking operations / synchronous operations
console.log('start');

console.log(fs.readFileSync("04.txt", "utf-8"));

console.log('this runs at last');


// non-blocking operations / asynchronous operations
console.log('start');

fs.readFile("04.txt", "utf-8", (err,res) => {
    if(err) console.log(err);
    else console.log(res);
});

console.log('this runs first');


// if infinite loop is there, then the above asyn fcn would never execute 

// while(1) {
//     console.log(1);
// }

const os = require("os");

// gives the no of cpu cores in our operating system
console.log(os.cpus().length);