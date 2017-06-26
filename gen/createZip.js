/* zip file creation module */
const AdmZip = require('adm-zip');

/* functions to add contents to zip */
const package_json = require('./gen/package_json');
const app_js = require('./gen/app_js');
const README_md = require('./gen/README_md');
const gitignore = require('./gen/gitignore');
const routes = require('./gen/routes');
const db = require('./gen/db');
const models = require('./gen/models');
const controllers = require('./gen/controllers');
const views = require('./gen/views');
const public_files = require('./gen/public_files');

const createZip = () => {

  const zip = new AdmZip();

  /* add buffers to zip */
  package_json(zip);
  app_js(zip);
  README_md(zip);
  gitignore(zip);
  routes(zip);
  db(zip);
  models(zip);
  controllers(zip);
  views(zip);
  public_files(zip);

  return zip.toBuffer();

};

module.exports = createZip;

