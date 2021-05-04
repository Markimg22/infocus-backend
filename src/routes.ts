import { Router } from 'express';

import userController from './controllers/UsersController';
import authController from './controllers/AuthController';

const router = Router();

/** Users */
router.post('/register', userController.store);
router.post('/login', authController.authenticate);

/** Tasks */

export { router };
