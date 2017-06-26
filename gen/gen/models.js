const inputs = require('../inputs');

const models = zip => {

  for (let val of inputs.routes) {

    const modelName = val.name[0].toUpperCase() +
                      val.name.substring(1, val.name.length);

    let refGets = '';
    for (let ref of val.id_refs) {
      
      const methodName = 'getAll_' + ref.split('->').join('_REF_');
      const tableName = getRefTableName(val, ref);

      refGets =
/* - { { { - */
`${refGets}
${modelName}.${methodName} = () => {
  return db.query('SELECT * FROM ${tableName}');
};
`;
/* - } } } - */
    }

    let findAllSelect = '';
    for (let i = 0; i < val.index.length; i++) {
      let column;
      let comma = ','
      if (i === val.index.length - 1) {
        comma = '';
      }
      if (val.index[i].indexOf('->') === -1) {
        column = `${val.name}.${val.index[i]}`;
      } else {
        const refTab = getRefTableName(val, val.index[i]);
        const refCol = val.index[i].split('->')[1];
        column = `${refTab}.${refCol}`;
      }

      findAllSelect =
/* - { { { - */
`${findAllSelect}        ${column}${comma}
`;
/* - } } } - */
    }

    let findAllJoins = '';
    for (let i = 0; i < val.index_refs.length; i++) {
      const refTab = getRefTableName(val, val.index_refs[i]);
      const refColFirst = val.index_refs[i].split('->')[0];

      findAllJoins =
/* - { { { - */
`${findAllJoins}      INNER JOIN ${refTab}
      ON ${val.name}.${refColFirst} = ${refTab}.id
`;
/* - } } } - */
    }

    let findByIdSelect = '';
    for (let i = 0; i < val.single.length; i++) {
      let column;
      let comma = ','
      if (i === val.single.length - 1) {
        comma = '';
      }
      if (val.single[i].indexOf('->') === -1) {
        column = `${val.name}.${val.single[i]}`;
      } else {
        const refTab = getRefTableName(val, val.single[i]);
        const refCol = val.single[i].split('->')[1];
        column = `${refTab}.${refCol}`;
      }

      findByIdSelect =
/* - { { { - */
`${findByIdSelect}        ${column}${comma}
`;
/* - } } } - */
    }

    let findByIdJoins = '';
    for (let i = 0; i < val.single_refs.length; i++) {
      const refTab = getRefTableName(val, val.single_refs[i]);
      const refColFirst = val.single_refs[i].split('->')[0];

      findByIdJoins =
/* - { { { - */
`${findByIdJoins}      INNER JOIN ${refTab}
      ON ${val.name}.${refColFirst} = ${refTab}.id
`;
/* - } } } - */
    }

    let createInserts = '';
    for (let i = 0; i < val.add_form.length; i++) {
      let column;
      let comma = ','
      if (i === val.add_form.length - 1) {
        comma = '';
      }
      if (val.add_form[i].column_ref.indexOf('->') === -1) {
        column = val.add_form[i].column_ref;
      } else {
        column = val.add_form[i].column_ref.split('->')[0];
      }

      createInserts =

/* - { { { - */
`${createInserts}        ${column}${comma}
`;
/* - } } } - */
    }

    let createValues = '';
    for (let i = 0; i < val.add_form.length; i++) {
      let comma = ',';
      if (i === val.add_form.length - 1) {
        comma = '';
      }

      createValues =

/* - { { { - */
`${createValues}        ${'$' + (i + 1)}${comma}
`;
/* - } } } - */
    }

    let createBodyData = '';
    for (let i = 0; i < val.add_form.length; i++) {
      let comma = ','
      if (i === val.add_form.length - 1) {
        comma = '';
      }

      createBodyData =

/* - { { { - */
`${createBodyData}      element.${val.add_form[i].name}${comma}
`;
/* - } } } - */
    }

    let updateUpdate = '';
    for (let i = 0; i < val.edit_form.length; i++) {
      let comma = ','
      if (i === val.edit_form.length - 1) {
        comma = '';
      }

      updateUpdate =

/* - { { { - */
`${updateUpdate}        ${val.edit_form[i].name} = $${i + 1}${comma}
`;
/* - } } } - */

    }

    const editFormLengthPlusOne = val.edit_form.length + 1;

    let updateBodyData = '';
    for (let i = 0; i < val.edit_form.length; i++) {

      updateBodyData =

/* - { { { - */
`${updateBodyData}      element.${val.edit_form[i].name},
`;
/* - } } } - */
    }

  /* create file contents */
  const file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`const db = require('../db/config');

const ${modelName} = {};
${refGets}
${modelName}.findAll = () => {
  return db.query(
    \`
      SELECT
        ${val.name}.id,
${findAllSelect}      FROM ${val.name}
${findAllJoins}      ORDER BY id DESC
    \`
  );
};

${modelName}.findById = id => {
  return db.oneOrNone(
    \`
      SELECT
${findByIdSelect}      FROM ${val.name}
${findByIdJoins}      WHERE ${val.name}.id = $1
    \`,
    [id]
  );
};

${modelName}.create = element => {
  return db.one(
    \`
      INSERT INTO ${val.name}
      (
${createInserts}      )
      VALUES
      (
${createValues}      )
      RETURNING *
    \`,
    [
${createBodyData}    ]
  );
};

${modelName}.update = (element, id) => {
  return db.none(
    \`
      UPDATE ${val.name} SET
${updateUpdate}      WHERE id = $${editFormLengthPlusOne}
    \`,
    [
${updateBodyData}      id
    ]
  );
};

${modelName}.destroy = id => {
  return db.none(
    \`
      DELETE FROM ${val.table_ref}
      WHERE id = $1
    \`,
    [id]
  );
};

module.exports = ${modelName};
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`models/${val.name}Model.js`,
                new Buffer(file), `${val.name}Model.js`);
    console.log('models.js');
  }

};

//models(5);

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

module.exports = models;

