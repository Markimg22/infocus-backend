import './database'
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(cors());

export { app };
