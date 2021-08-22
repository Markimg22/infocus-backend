import { Router } from 'express';

import createUsersControllers from './controllers/CreateUsersControllers';
import authenticateUsersControllers from './controllers/AuthenticateUsersControllers';
import createTasksControllers from './controllers/CreateTasksControllers';
import deleteTasksControllers from './controllers/DeleteTasksControllers';

import authMiddleware from './middlewares/authMiddleware';

const router = Router();

/** Users */
router.post('/register', createUsersControllers.handle);
router.post('/login', authenticateUsersControllers.handle);

/** Tasks */
router.post('/user/tasks', authMiddleware, createTasksControllers.handle);
router.delete('/user/tasks', authMiddleware, deleteTasksControllers.handle);

export { router };
