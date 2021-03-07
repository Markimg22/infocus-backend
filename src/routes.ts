import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Olá mundo');
});

export default routes;
