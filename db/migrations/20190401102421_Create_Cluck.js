
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cluck',(c)=>{
    c.increments('id').primary();
    c.string('username');
    c.string('image_url');
    c.text('content');
    c.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cluck');
};
