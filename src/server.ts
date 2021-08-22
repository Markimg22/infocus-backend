import 'reflect-metadata';
import 'express-async-errors';
import './database';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { handleErrors } from './middlewares/handleErrors';
import { router } from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrors);

app.listen(process.env.PORT || 3333, () => {
  console.log('📦 Successfully connected with database.');
  console.log(`🔥 Server started at ${process.env.PORT || 3333}.`);
});
