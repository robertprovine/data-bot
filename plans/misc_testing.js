const express = require('express');
const archiver = require('archiver');
const fs = require('fs');

app = express();
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

var AdmZip = require('adm-zip');

app.get('/', (req, res) => {
  var zip = new AdmZip();
  res.set({
    'Content-Type': 'application/zip',
    'Content-disposition': 'attachment; filename=myCuteFile.zip'
  });

  // add file directly 
  zip.addFile("app.js", new Buffer('const express = require\'express\');'), "app.js file");
  zip.addFile("package.json", new Buffer('{name: \'Robert\'}'), "package.json file");
  zip.addFile("controllers/quotes.js", new Buffer('const Quote = require(\'../models/quotes\');'), "controller file");
  var willSendthis = zip.toBuffer();
  // or write everything to disk 
  //zip.writeZip(/*target file name*/"./files.zip");
  res.send(willSendthis);
  //res.download('./files.zip');
});
 
/*
app.get('/download', function(req, res){
  var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
  res.download(file); // Set disposition and send it.
});
*/
 
/* found online:
* http://stackoverflow.com/questions/20107303/dynamically-create-and-stream-zip-to-client */
/*
var Http = require('http');
var Archiver = require('archiver');

Http.createServer(function (request, response) {
// Tell the browser that this is a zip file.
  response.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-disposition': 'attachment; filename=myFile.zip'
  });

  var zip = Archiver('zip');

  // Send the file to the page output.
  zip.pipe(response);

  // Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
  zip.append('Some text to go in file 1.', { name: '1.txt' })
     .append('Some text to go in file 2. I go in a folder!', { name: 'somefolder/2.txt' })
         .file('staticFiles/3.txt', { name: '3.txt' })
     finalize();

}).listen(3000);
*/

