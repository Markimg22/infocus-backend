import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log(`📦 Connected to database: ${process.env.DB_DATABASE || 'teste'}`);
}).catch((error) => {
  console.error(`Error connecting to database: ${error}`);
  process.exit(1);
});
