const fs = require("fs");

/*  sync way to read/write file
var readme = fs.readFileSync("readme.md", "utf8");
fs.writeFileSync("newFile.txt", readme);
*/

//  async way to read/write files
fs.readFile("readme.md", "utf8", function(err, data) {
    fs.writeFile("newFile.txt", data, (err)=>{ });
    console.log("\nData written successfully");
    if(err)    console.error(err);
});

