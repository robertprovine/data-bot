//const zipBuffer = require('./zipBuffer');
const express = require('express');
//const AdmZip = require('adm-zip');
const inputs = require('./inputs');

/* function that creates and returns a buffer of the final zip */
const createZip = require('./createZip');

app = express();
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//console.log(`attachment; filename=${inputs.name}.zip`);

app.get('/', (req, res) => {
  //const zip = new AdmZip();
  res.set({
    'Content-Type': 'application/zip',
    'Content-disposition': `attachment; filename=${inputs.name}.zip`
  })
  res.send(createZip());
/*
  zip.addFile("app.js", new Buffer('const express = require\'express\');'), "app.js file");
  zip.addFile("package.json", new Buffer('{name: \'Robert\'}'), "package.json file");
  zip.addFile("controllers/quotes.js", new Buffer('const Quote = require(\'../models/quotes\');'), "controller file");
  zip.addFile("controllers/mimes.js", new Buffer('const Mime = require(\'../models/quotes\');'), "mime file");
  var willSendthis = zip.toBuffer();
*/
});
