import { Router } from 'express';

import userController from './controllers/UserController';

const router = Router();

/** Users */
router.get('/users', userController.show);

export { router };
