
exports.up = function(knex) {
  return knex.schema.alterTable("users", (table)=>{
    table.datetime("deleted_at")
  })  
};

exports.down = function(knex) {
  return knex.schema.alterTable("users", (table)=>{
    table.dropColumn("deleted_at")
  })
};
