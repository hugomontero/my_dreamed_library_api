
exports.up = function(knex) {
  return knex.schema.alterTable("books", (table)=>{
    table.datetime("deleted_at")
  }) 
};

exports.down = function(knex) {
  return knex.schema.alterTable("books", (table)=>{
    table.dropColumn("deleted_at")
  }) 
};
