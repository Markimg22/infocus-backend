console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);

module.exports = [
  {
    environment: 'development',
    name: 'development',
    type: 'postgres',
    url: process.env.DATABASE_URL_DEVELOPMENT,
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/entities',
    },
  },
  {
    environment: 'production',
    name: 'production',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: ['dist/database/migrations/*.js'],
    entities: ['dist/entities/*.js'],
    cli: {
      migrationsDir: 'dist/database/migrations',
      entitiesDir: 'dist/entities',
    },
  },
  {
    environment: 'test',
    name: 'test',
    type: 'sqlite',
    database: 'src/__tests__/database.sqlite',
    migrations: ['src/__tests__/migrations/*.ts'],
    entities: ['src/__tests__/entities/*.ts'],
    cli: {
      migrationsDir: 'src/__tests__/migrations',
      entitiesDir: 'src/__tests__/entities',
    },
  },
];
