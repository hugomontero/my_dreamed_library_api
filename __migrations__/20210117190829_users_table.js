
exports.up = function(knex) {
 return knex.schema.createTable("users", (table)=>{
   table.increments("id")
   table.integer("user_type")
   table.string("username")
   table.string("firstname")
   table.string("lastname")
   table.string("email")
   table.datetime("registerd_at")
   table.timestamps()
   table.unique("email")
   table.index("registerd_at", "users_by_registration_date")
   table.index("user_type", "users_by_type")

 }) 
};

exports.down = function(knex) {
 return knex.schema.dropTable("users")
};
