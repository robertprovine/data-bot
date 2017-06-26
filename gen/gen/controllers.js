const inputs = require('../inputs');

const controllers = zip => {

  /* create controllers & put in controllers folder */
  for (let val of inputs.routes) {

    const modelName = val.name[0].toUpperCase() +
                      val.name.substring(1, val.name.length);

    /* create reference arrays */
    const refArrayNames = [];
    let refArrays = '';
    for (let ref of val.id_refs) {
      const arrayName = ref.split('->').join('_REF_');
      refArrayNames.push(arrayName);
      refArrays =
/* - { { { - */
`${refArrays}
const ${arrayName} = [];`;
/* - } } } - */
    }

    let getAllRefArrays = '';
    for (let name of refArrayNames) {
      getAllRefArrays =
/* - { { { - */
`${getAllRefArrays}
${modelName}.getAll_${name}()
  .then(elements => {
    elements.forEach(element => {
      ${name}.push(element);
    });
  });
`;
/* - } } } - */
    }

    let addRefsToRender = '';
    for (let ref of val.add_refs) {
      const name = ref.split('->').join('_REF_');
      addRefsToRender =
/* - { { { - */
`${addRefsToRender}    ${name}: ${name},
`;
/* - } } } - */
    }

    let addReqBodyNames = '';
    for (let i = 0; i < val.add_form.length; i++) {
      const name = val.add_form[i];
      let comma = ',';
      if (i === (val.add_form.length - 1)) {
        comma = '';
      }
      addReqBodyNames =
/* - { { { - */
`${addReqBodyNames}      ${name.name}: req.body.${name.name}${comma}
`;
/* - } } } - */
    }

    let editRefsToRender = '';
    for (let ref of val.edit_refs) {
      const name = ref.split('->').join('_REF_');
      editRefsToRender =
/* - { { { - */
`${editRefsToRender}        ${name}: ${name},
`;
/* - } } } - */
    }

    let editReqBodyNames = '';
    for (let i = 0; i < val.edit_form.length; i++) {
      const name = val.edit_form[i];
      let comma = ',';
      if (i === (val.edit_form.length - 1)) {
        comma = '';
      }
      editReqBodyNames =
/* - { { { - */
`${editReqBodyNames}      ${name.name}: req.body.${name.name}${comma}
`;
/* - } } } - */
    }

    const file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`const ${modelName} = require('../models/${val.name}Model');

const controller = {};
${refArrays}
${getAllRefArrays}
controller.add = (req, res) => {
  res.render('${val.name}/${val.name}-add', {
${addRefsToRender}    documentTitle: '${inputs.document_title}'
  });
};

controller.index = (req, res) => {
  ${modelName}.findAll()
    .then(elements => {
      res.render('${val.name}/${val.name}-index', {
        ${val.name}Data: elements,
        documentTitle: '${inputs.document_title}'
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.show = (req, res) => {
  ${modelName}.findById(req.params.id)
    .then(element => {
      res.render('${val.name}/${val.name}-single', {
        ${val.name}Element: element,
        documentTitle: '${inputs.document_title}'
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.create = (req, res) => {
  ${modelName}.create({
${addReqBodyNames}    })
    .then(element => {
      res.redirect('/${val.name}');
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.edit = (req, res) => {
  ${modelName}.findById(req.params.id)
    .then(element => {
      res.render('${val.name}/${val.name}-edit', {
        ${val.name}Element: element,
${editRefsToRender}        id: req.params.id,
        documentTitle: '${inputs.document_title}'
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.update = (req, res) => {
  ${modelName}.update({
${editReqBodyNames}    }, req.params.id)
    .then(element => {
      res.redirect('/${val.name}');
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

controller.destroy = (req, res) => {
  ${modelName}.destroy(req.params.id)
    .then(() => {
      res.redirect('/${val.name}');
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = controller;
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    zip.addFile(`controllers/${val.name}Controller.js`,
                new Buffer(file), `${val.name}Controller.js`);

    console.log('controllers');
  }

};

module.exports = controllers;

