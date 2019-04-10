// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cluckr_db'
    },
    migrations: {
      directory: 'db/migrations'
    }
  }

};
