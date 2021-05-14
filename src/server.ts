import 'reflect-metadata';
// import './database';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import { router } from './routes';

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.emit('connected'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());
app.use(router);

app.on('connected', () => {
  app.listen(3333, () => {
    console.log('📦 Successfully connected with database');
    console.log('🔥 Server started at http://localhost:3333');
  });
});
