const inputs = require('./inputs');
    const val = inputs.routes[0];
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
console.log(editFields);


function getRefTableName(route, ref) {
  const columnName = ref.split('->')[0];
  const table = inputs.tables[inputs.tables_idx[route.table_ref]];
  let i = 0;
  while (table.columns[i].name !== columnName) {
    i++;
  }
  return table.columns[i].type.split(/[ ()]/)[2];
}
