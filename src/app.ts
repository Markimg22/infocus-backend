import 'reflect-metadata';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import createConnection from './database';
import { router } from './routes';

dotenv.config();

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use(cors());

export { app };
