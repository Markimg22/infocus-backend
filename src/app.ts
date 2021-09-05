import express from 'express';
import cors from 'cors';

import { handleErrors } from './middlewares/handleErrors';
import { router } from './routes';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrors);

export { app };
