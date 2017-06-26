const inputs = require('../inputs');

const gitignore = zip => {

  /* create file contents */
  const file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`# Logs
logs
*.log

# Dependencies
node_modules

# Debug log from npm
npm-debug.log

# Extras
.env
.DS_Store
*.DS_Store
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  zip.addFile(".gitignore", new Buffer(file), ".gitignore");

};

module.exports = gitignore;

