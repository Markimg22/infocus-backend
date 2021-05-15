import { Router } from 'express';

import userController from './controllers/UserController';
import authController from './controllers/AuthController';
import taskController from './controllers/TaskController';

import authMiddleware from './middlewares/authMiddleware';

const router = Router();

/** Users */
router.post('/register', userController.store);
router.post('/login', authController.authenticate);

/** Tasks */
router.post('/user/tasks', authMiddleware, taskController.store);
router.get('/user/tasks', authMiddleware, taskController.show);
router.delete('/user/tasks/:id', authMiddleware, taskController.remove);
router.put('/user/tasks/:id', authMiddleware, taskController.update);

export { router };
