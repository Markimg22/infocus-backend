import 'reflect-metadata';
import './database';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { router } from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3333, () => {
  console.log('🔥 Server started at http://localhost:3333');
});
