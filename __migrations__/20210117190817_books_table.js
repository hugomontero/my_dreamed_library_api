
exports.up = function(knex) {
  return knex.schema.createTable("books", (table)=>{
    table.increments("id")
    table.string("title")
    table.string("ISBN")
    table.string("author")
    table.string("publisher")
    table.integer("copies")
    table.string("cover_image")
    table.timestamps()
    table.unique("ISBN")
    table.index("ISBN", "books_by_isbn")
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable("books") 
};
