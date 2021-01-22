
exports.up = function(knex) {
 return knex.schema.createTable("users_books_checkout", (table)=>{
   table.increments("id")
   table.integer("user_id").unsigned()
   table.integer("book_id").unsigned()
   table.datetime("return_date")
   table.timestamps()
   table.foreign("user_id").references("users.id")
   table.foreign("book_id").references("books.id")
 }) 
};

exports.down = function(knex) {
 return knex.schema.dropTable("users_books_checkout") 
};
