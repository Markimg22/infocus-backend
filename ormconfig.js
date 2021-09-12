console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);

module.exports = [
  {
    environment: 'development',
    name: 'development',
    type: 'postgres',
    url: process.env.DATABASE_URL_DEVELOPMENT,
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts'],
    synchronize: false,
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/entities',
    },
  },
  {
    environment: 'production',
    name: 'production',
    type: 'postgres',
    synchronize: false,
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
    synchronize: false,
    database: 'src/database/database-test.sqlite',
    migrationsRun: true,
    dropSchema: true,
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/entities',
    },
  },
];
