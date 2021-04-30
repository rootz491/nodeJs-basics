const fs = require("fs");

//  sync way to read/write file
var readme = fs.readFileSync("readme.md", "utf8");
fs.writeFileSync("newFile.txt", readme);


//  async way to read/write files
fs.readFile("readme.md", "utf8", function(err, data) {
    //  write data to file
    fs.writeFile("newFile.txt", data, (err)=>{ });
    console.log("Data written successfully");

    //  remove a file
    fs.unlink("newFile.txt", (err) => {
        console.log("file removed!");
    });
});

//  if you recreate a folder that is already created once, then it'll throw an ERROR;
//  same goes for deleting a folder.

//  creating a folder
fs.mkdirSync("example");
//  create file in that folder
fs.writeFileSync("./example/example.txt", "this is just a dump file");
console.log("created a folder and file");

//  doing same thing, but in async way
fs.mkdir("example2", (err) => {
    fs.writeFile('./example2/example2.txt', "this is async way to do same thing",err => {});
    console.log("created another folder and file");
});



//  deleting a file in async way
fs.unlink("./example/example.txt", (err) => {
    //  deleting folder in async way
    fs.rmdir("./example", err => {});

    //  deleting another file & folder
    fs.unlink("./example2/example2.txt", (err) => {
        //  deleting folder in async way
        fs.rmdir("./example2", err => {});
    });

    console.log("deleted all those folder and file");
});


