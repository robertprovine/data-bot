const inputs = require('../inputs');

const routes = zip => {

  /* create file contents for each route & put in routes folder */
  for (let val of inputs.routes) {

    const file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`const express = require('express');
const controller = require('../controllers/${val.name}Controller');

const ${val.name}Routes = express.Router();

${val.name}Routes.get('/', controller.index);
${val.name}Routes.get('/add', controller.add);
${val.name}Routes.get('/edit/:id', controller.edit);
${val.name}Routes.get('/:id', controller.show);
${val.name}Routes.post('/', controller.create);
${val.name}Routes.put('/:id', controller.update);
${val.name}Routes.delete('/:id', controller.destroy);

module.exports = ${val.name}Routes;
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`routes/${val.name}.js`, new Buffer(file), `${val.name}.js`);

  }

};

module.exports = routes;

