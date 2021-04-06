import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	return res.render(`
    <h1>Hello world</h1>
  `);
});

export { router };
