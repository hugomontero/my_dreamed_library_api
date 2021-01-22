
exports.up = function(knex) {
 return knex.schema.alterTable("users_books_checkout", (table)=>{
    table.datetime("deleted_at")
  })
};

exports.down = function(knex) {
 return knex.schema.alterTable("users_books_checkout", (table)=>{
    table.dropColumn("deleted_at")
 }) 
};
