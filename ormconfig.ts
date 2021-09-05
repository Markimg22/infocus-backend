import { ConnectionOptions } from 'typeorm';

export = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  migrations: [`${__dirname}/database/migrations/*.{ts, js}`],
  entities: [`${__dirname}/entities/*.{ts, js}`],
  cli: {
    migrationsDir: `${__dirname}/database/migrations`,
    entitiesDir: `${__dirname}/entities`,
  },
} as ConnectionOptions;
