const userInputs = require('./userInputs');
const fs = require('fs');

console.log("name:", userInputs.project_name);
console.log("document_title:", userInputs.homepage_title);

const tablesIdx = {};
const tables = [];
const routes = [];
let idRefs = [];

const inputs = {
  name: userInputs.project_name,
  document_title: userInputs.homepage_title,
  welcome_message: userInputs.description,
  db_name: `${userInputs.project_name.split('-').join('_')}_development`,
  tables_idx: tablesIdx,
  tables: [],
  routes: [],
};

userInputs.tables.forEach((table, i) => {
  tablesIdx[table.name] = i;
  tables[i] = {};
  tables[i].name = table.name;
  tables[i].columns = table.columns.map(column => {
    const type = column.type.split(/[ ()]/);
    if (type[1] === 'REFERENCES') {
      idRefs.push(`${column.name}->${type[2]}`);
    }
    return {
      name: column.name,
      type: column.type,
    };
  });

  routes[i] = {};
  routes[i].id_refs;
  routes[i].name = table.name;
  routes[i].view_name = `${table.name[0].toUpperCase()}${table.name.substring(1, table.name.length)}`;
  routes[i].table_ref = table.name;
  idRefs = [];
});


console.log(inputs);
fs.writeFile('inputsTest.json', JSON.stringify(inputs));

/*
        {
          "name": "category_id",
          "type": "INTEGER REFERENCES categories(id)",
          "index_view_visible": "true",
          "single_view_visible": "true"
        },
    {
      "name": "todos",
      "view_name": "To-Dos",
      "sing_view_name": "To Do",
      "table_ref": "todos",
      "id_refs": [
        "category_id->category",
        "category_id->money",
        "category_id->lovers"
      ],
      "index_refs": [
        "category_id->category",
        "category_id->lovers"
      ],
      "single_refs": [
        "category_id->lovers",
        "genre_id->lovers"
      ],
      "add_refs": [
        "category_id->category",
        "category_id->lovers"
      ],
      "edit_refs": [
        "category_id->category",
        "category_id->cuties"
      ],
{
  "project_name": "todo-app",
  "homepage_title": "To Do App",
  "description": "Welcome to my To Do App",
  "tables": [
    {
      "name": "categories",
      "columns": [
        {
          "name": "title",
          "type": "VARCHAR(255)"
        }
      ]
    },
    {
      "name": "animals",
      "columns": [
        {
          "name": "title",
          "type": "VARCHAR(255)",
          "index_view_visible": "true",
          "single_view_visible": "true"
        },

project_name [a-zA-Z\-_]+
homepage_title
description (description as h2 in homepage)
table1_name
  column1_name
  column1_type
  column2_name
  column2_type ..
table2_name ..
*/
