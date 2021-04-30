const fs = require("fs");

/*  sync way to read/write file
var readme = fs.readFileSync("readme.md", "utf8");
fs.writeFileSync("newFile.txt", readme);
*/

//  async way to read/write files
fs.readFile("readme.md", "utf8", function(err, data) {
    fs.writeFile("newFile1.txt", data);
    console.log("\nData written successfully!");
});

