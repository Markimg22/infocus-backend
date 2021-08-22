import { Router } from 'express';

import createUsersControllers from './controllers/CreateUsersControllers';
import authenticateUsersControllers from './controllers/AuthenticateUsersControllers';

// import authMiddleware from './middlewares/authMiddleware';

const router = Router();

/** Users */
router.post('/register', createUsersControllers.handle);
router.post('/login', authenticateUsersControllers.handle);

export { router };
