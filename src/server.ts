import 'reflect-metadata';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import { router } from './routes';

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => app.emit('connected'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());
app.use(router);

app.on('connected', () => {
  app.listen(process.env.PORT || 3333, () => {
    console.log('📦 Successfully connected with database');
    console.log(`🔥 Server started at ${process.env.PORT || 3333}`);
  });
});
