import { Router } from 'express';

import userController from './controllers/UserController';
import tokenController from './controllers/TokenController';

import loginRequired from './middlewares/loginRequired';

const router = Router();

// router.get('/users', userController.index);
// router.get('/users/:id', userController.show);

router.post('/register', userController.create);
router.post('/login', tokenController.create);

router.put('/users/', loginRequired, userController.update);
router.delete('/users/', loginRequired, userController.delete);

export { router };
