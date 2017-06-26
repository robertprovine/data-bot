const inputs =

{
  "name": "todo-app",
  "document_title": "To Do App",
  "welcome_message": "Welcome to my To Do App",
  "db_name": "todos_gen", // _development is shown on interface
  "tables_idx": {
    "categories": 0,
    "todos": 1
  },
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
          "type": "VARCHAR(255)"
        },
        {
          "name": "description",
          "type": "VARCHAR(1024)"
        },
        {
          "name": "animal_type",
          "type": "VARCHAR(1024)"
        },
        {
          "name": "status",
          "type": "INTEGER"
        },
        {
          "name": "category_id",
          "type": "INTEGER REFERENCES categories(id)"
        },
        {
          "name": "genre_id",
          "type": "INTEGER REFERENCES genres(id)"
        }
      ]
    }
  ],
  "routes": [
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
      "index": [
        "title",
        "status",
        "category_id->category"
      ],
      "single": [
        "title",
        "status",
        "description"
      ],
      "add_form": [
        {
          "title": "Title",
          "name": "title",
          "column_ref": "title"
        },
        {
          "title": "Category",
          "name": "category_id",
          "column_ref": "category_id->category"
        },
        {
          "title": "Description",
          "name": "description",
          "column_ref": "description"
        },
        {
          "title": "Status",
          "name": "status",
          "column_ref": "status"
        }
      ],
      "edit_form": [
        {
          "title": "Title",
          "name": "title",
          "column_ref": "title"
        },
        {
          "title": "Category",
          "name": "category_id",
          "column_ref": "category_id->category"
        },
        {
          "title": "Description",
          "name": "description",
          "column_ref": "description"
        },
        {
          "title": "Status",
          "name": "status",
          "column_ref": "status"
        }
      ]
    }
  ]
};

module.exports = inputs;
