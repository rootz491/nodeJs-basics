const fs = require("fs");

//  readable stream
//  reading chunk by chunk,

//  by default, data will be read as hex but you can enable utf8 so data will be in understandable format
let myReadableStream = fs.createReadStream("./lotsOfData.txt" /* , "utf8" */);
//  creating a writeable stream, using which we can write to a file, chunk by chunk!
let myWritableStream = fs.createWriteStream("./newChunk.txt");



/*  so here we are reading data in chunks and writing into other file as we read!
    using readStream & writeStream.

//  createReadStream's object also inherits eventEmitter's property,
//  so on arrival of new chunk, `data` event will emit and you can then read the data. 
myReadableStream.on("data", chunk => {
    console.log("new chunk has arrived");
    //  on receiving new chunk of data, we can write to another file at same time through that writableStream;
    myWritableStream.write(chunk);
});
*/

/*  
    we can write into other file using other method also
    it is called PIPE
*/

myReadableStream.pipe(myWritableStream);



/*
    so readStream & writeStream are similar to readFile & writeFile BUT
    only difference is, it's more efficient when we deal with large chunk of data!
*/