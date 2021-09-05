import 'reflect-metadata';
import 'express-async-errors';
import './database';

import { app } from './app';

app.listen(process.env.PORT || 3000, () => {
  console.log(`🔥 Server started in ${process.env.PORT || 3000}.`);
});
