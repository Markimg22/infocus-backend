const configDatabaseDevelopment = {
  type: 'postgres',
  host: process.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/entities/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities',
  },
};

const configDatabaseTest = {
  type: 'sqlite',
  database: '__tests__/database.sqlite',
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/entities/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities',
  },
};

const configDatabaseProduction = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
};

switch (process.env.NODE_ENV) {
  case 'development':
    module.exports = configDatabaseDevelopment;
    break;
  case 'test':
    module.exports = configDatabaseTest;
    break;
  case 'production':
    module.exports = configDatabaseProduction;
    break;
}
