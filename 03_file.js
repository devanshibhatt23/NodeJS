const fs = require("fs");

// console.log(fs)

// synchronous
fs.writeFileSync("./04.txt", "xyz");

// asynchronous
fs.writeFile("./04.txt", "hey there", (err) => {});

// const result = fs.readFileSync("./04.txt", "utf-8");
// console.log(result);

fs.readFile("./04.txt", "utf-8", (err, result) => {
    if(err) console.log("error", err);
    else console.log(result);
})

fs.appendFileSync("./05.txt", new Date().getDate().toLocaleString() + " "); 
fs.appendFileSync("./05.txt", `${Date.now()}`); 

fs.cpSync("05.txt", "06_copy.txt");
fs.unlinkSync("06_copy.txt");

console.log(fs.statSync("04.txt"));

fs.mkdirSync("docs");