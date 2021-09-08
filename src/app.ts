import express, { RequestHandler } from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import { handleErrors } from './middlewares/handleErrors';
import { router } from './routes';

import * as swaggerDocument from './swagger.json';

require('dotenv').config();

const app = express();

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(router);
app.use(handleErrors);

export { app };
