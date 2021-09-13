import express, { RequestHandler } from 'express';
import cors from 'cors';

import { handleErrors } from './middlewares/handleErrors';
import { router } from './routes';

require('dotenv').config();

const app = express();

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cors());
app.use(router);
app.use(handleErrors);

export { app };
