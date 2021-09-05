import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log(`📦 Connected to database: ${process.env.DATABASE}`);
}).catch((error) => {
  console.error(`Error connecting to database: ${error}`);
});
