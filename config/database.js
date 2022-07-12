const { parse } = require("pg-connection-string");



if (process.env.NODE_ENV === "development") {
  module.exports = ({ env }) => ({
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('db', '.tmp/data.db'),
      },
      useNullAsDefault: true,
      debug: false,
    },
  });



} else {
  module.exports = ({ env }) => {
    const { host, port, database, user, password } = parse(env("DATABASE_URL"));

    return {
      connection: {
        client: 'postgres',
        connection: {
          host,
          port,
          database,
          user,
          password,
          ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
          },
        },
      },
    }
  };
}