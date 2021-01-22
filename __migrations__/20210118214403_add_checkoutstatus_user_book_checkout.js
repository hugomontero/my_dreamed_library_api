
exports.up = function(knex) {
  return knex.schema.alterTable('users_books_checkout', (table)=>{
    table.string('checkout_status')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('users_books_checkout', (table)=>{
    table.dropColumn('checkout_status')
  }) 
};
