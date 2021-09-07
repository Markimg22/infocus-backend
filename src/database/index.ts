import { createConnection } from 'typeorm';

require('dotenv').config();

createConnection(process.env.NODE_ENV).then(() => {
  console.log('📦 Connected to database.');
}).catch((error) => {
  console.error(`Error connecting to database: ${error}.`);
});
