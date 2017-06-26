const inputs = require('../inputs');

const views = zip => {

  let homepageLinks = '';
  for (let val of inputs.routes) {
    homepageLinks =

/* - { { { - */
`${homepageLinks}  <a class='link' href='/${val.name}'>${val.view_name}</a>
`;
/* - } } } - */

  }

  /* create homepage */
  let file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`<% include ./partials/boilerplate.ejs %>
  <h1 class='main-title'>${inputs.document_title}</h1>
  <h2 class='welcome'><%= message %></h2>
${homepageLinks}<% include ./partials/end.ejs %>
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`views/index.ejs`,
                new Buffer(file), `index.ejs`);

  /* create boilerplate */
  file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8' />
  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  <meta http-equiv='X-UA-Compatible' content='ie=edge' />
  <title><%= documentTitle %></title>
  <link rel='stylesheet' type='text/css' href='/static/styles/reset.css'>
  <link rel='stylesheet' type='text/css' href='/static/styles/style.css'>
</head>
<body>
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`views/partials/boilerplate.ejs`,
                new Buffer(file), `boilerplate.ejs`);

  /* create end */
  file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`</body>
</html>`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`views/partials/end.ejs`,
                new Buffer(file), `end.ejs`);

  for (let val of inputs.routes) {

    let indexData = '';

    for (let i = 0; i < val.index.length; i++) {
      let column;
      if (val.index[i].indexOf('->') === -1) {
        column = val.index[i];
      } else {
        column = val.index[i].split('->')[1];
      }

      indexData =
/* - { { { - */
`${indexData}    <span class='data'><%= element.${column} %></span>
`;
/* - } } } - */
    }
    

    /* create index */
    file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`<% include ../partials/boilerplate %>
  <a class='add-new' href='/${val.name}/add'>Add New ${val.sing_view_name}</a>
  <% ${val.name}Data.forEach(function(element) { %>
${indexData}    <a class='link' href='/${val.name}/<%= element.id %>'>Info</a>
    <a class='link' href='/${val.name}/edit/<%= element.id %>'>Edit</a>
    <form method='POST' action='/${val.name}/<%= element.id %>?_method=DELETE'>
      <input class='delete' type='submit', value='Delete' />
    </form>
  <% }) %>
<% include ../partials/end %>
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`views/${val.name}/${val.name}-index.ejs`,
                new Buffer(file), `${val.name}-index.ejs`);

    let singleData = '';

    for (let i = 0; i < val.single.length; i++) {
      let column;
      if (val.single[i].indexOf('->') === -1) {
        column = val.single[i];
      } else {
        column = val.single[i].split('->')[1];
      }

      singleData =
/* - { { { - */
`${singleData}  <span class='data'><%= ${val.name}Element.${column} %></span>
`;
/* - } } } - */
    }

    /* create single */
    file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`<% include ../partials/boilerplate %>
${singleData}  <a class='link' href='/${val.name}/edit/<%= ${val.name}Element.id %>'>Edit</a>
  <form method='POST' action='/${val.name}/<%= ${val.name}Element.id %>?_method=DELETE'>
    <input type='submit' value='Del' />
  </form>
<% include ../partials/end %>
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`views/${val.name}/${val.name}-single.ejs`,
                new Buffer(file), `${val.name}-single.ejs`);

    let addFields = '';

    for (let i = 0; i < val.add_form.length; i++) {
      const inputName = val.add_form[i].name;
      const inputTitle = val.add_form[i].title;
      const label =
/* - { { { - */
`    <h3 class='label'>${inputTitle}</h3>
`;
/* - } } } - */
      let input;
      if (val.add_form[i].column_ref.indexOf('->') !== -1) {
        const selectArrayName = val.add_form[i].column_ref.split('->').join('_REF_');
        const refTableName = getRefTableName(val, val.add_form[i].column_ref);
        const refTableColumn = val.add_form[i].column_ref.split('->')[1];
        input =
/* - { { { - */
`    <select name='${inputName}' class='select'>
    <% ${selectArrayName}.forEach(function(element) { %>
      <option value='<%= element.id %>'><%= element.${refTableColumn} %></option>
    <% }) %>
    </select>
`;
/* - } } } - */
      } else {
        input =
/* - { { { - */
`    <input name='${inputName}' type='text' placeholder='${val.add_form[i].title}' />
`;
/* - } } } - */
      }


      addFields =
/* - { { { - */
`${addFields}${label}${input}`;
/* - } } } - */
    }

    /* create add */
    file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`<% include ../partials/boilerplate %>
  <h3 class='label'>Add a new ${val.sing_view_name}</h3>
  <form id='${val.name}-form' method='POST' action='/${val.name}'>
${addFields}    <input type='submit' value='Submit' />
  </form>
<% include ../partials/end %>
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`views/${val.name}/${val.name}-add.ejs`,
                new Buffer(file), `${val.name}-add.ejs`);


    let editFields = '';

    for (let i = 0; i < val.edit_form.length; i++) {
      const inputName = val.edit_form[i].name;
      const inputTitle = val.edit_form[i].title;
      const label =
/* - { { { - */
`    <h3 class='label'>${inputTitle}</h3>
`;
/* - } } } - */
      let input;
      let dataElement;
      if (val.edit_form[i].column_ref.indexOf('->') !== -1) {
        const selectArrayName = val.edit_form[i].column_ref.split('->').join('_REF_');
        const refTableName = getRefTableName(val, val.edit_form[i].column_ref);
        const refTableColumn = val.edit_form[i].column_ref.split('->')[1];
        dataElement = val.edit_form[i].column_ref.split('->')[0];
        input =
/* - { { { - */
`    <select name='${inputName}' class='select'>
    <% ${selectArrayName}.forEach(function(element) { %>
      <% if (${val.name}.${dataElement} == element.id) { %>
        <option value='<%= element.id %>'><%= element.${refTableColumn} %></option>
      <% } else { %>
        <option value='<%= element.id %>'><%= element.${refTableColumn} %></option>
      <% } %>
    <% }) %>
    </select>
`;
/* - } } } - */
      } else {
        dataElement = val.edit_form[i].column_ref;
        input =
/* - { { { - */
`    <input onclick='this.select()' name='${inputName}' type='text' placeholder='${val.edit_form[i].title}' value='<%= ${val.name}Element.${dataElement} %>'/>
`;
/* - } } } - */
      }

      editFields =
/* - { { { - */
`${editFields}${label}${input}`;
/* - } } } - */
    }

    /* create edit */
    file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`<% include ../partials/boilerplate %>
  <form id='${val.name}-edit-form' method='POST' action='/${val.name}/<%= id %>?_method=PUT'>
${editFields}    <input type='submit' value='Save' />
    <button onclick='resetFormAndGoBack()'>Cancel</a>
  </form>
  <script>
    function resetFormAndGoBack() {
      window.history.back();
      document.getElementById('${val.name}-edit-form').reset();
    }
  </script>
<% include ../partials/end %>
`
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    zip.addFile(`views/${val.name}/${val.name}-edit.ejs`,
                new Buffer(file), `${val.name}-edit.ejs`);

  }

};

/* helper functions */
function getRefTableName(route, ref) {
  const columnName = ref.split('->')[0];
  const table = inputs.tables[inputs.tables_idx[route.table_ref]];
  let i = 0;
  while (table.columns[i].name !== columnName) {
    i++;
  }
  return table.columns[i].type.split(/[ ()]/)[2];
}

module.exports = views;
