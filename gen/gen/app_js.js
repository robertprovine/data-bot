const inputs = require('../inputs');

const app_js = zip => {

  /* require routes */
  let routeImports = '';
  for (let val of inputs.routes) {
    routeImports =
/* - { { { - */
`${routeImports}const ${val.name}Routes = require('./routes/${val.name}Routes');
`;
/* - } } } - */
  }

  /* use routes */
  let routeUses = '';
  for (let val of inputs.routes) {
    routeUses =
/* - { { { - */
`${routeUses}app.use('/${val.name}', ${val.name}Routes);
`;
/* - } } } - */
  }

  /* create file contents */
  const file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`/* setting up express */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

/* importing routes */
${routeImports}
/* setting up port & listen */
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(\`listening on port \${PORT}\`);
});

/* setting up views */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* setting static file */
app.use('/static', express.static(path.join(__dirname, 'public')));
/* setting up logger */
app.use(logger('dev'));
/* setting up body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

/* setting routes */
app.get('/', (req, res) => {
  res.render('index', {
    documentTitle: '${inputs.document_title}',
    message: '${inputs.welcome_message}'
  });
});

${routeUses}
/* handling 404 */
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  zip.addFile("app.js", new Buffer(file), "app.js");

};

module.exports = app_js;

