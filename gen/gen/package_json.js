const inputs = require('../inputs');

const package_json = zip => {

  /* create file contents */
  const file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`{
  "name": "${inputs.name}",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "repository": {
    "type": "",
    "url": ""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.17.1",
    "cookie-parser": "^1.4.3",
    "ejs": "^2.5.6",
    "express": "^4.15.2",
    "method-override": "^2.3.8",
    "morgan": "^1.8.1",
    "path": "^0.12.7",
    "pg-promise": "^5.6.7"
  }
}
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  zip.addFile("package.json", new Buffer(file), "package.json");

};

module.exports = package_json;

