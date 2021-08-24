import { Router } from 'express';

import createUsersControllers from './controllers/CreateUsersControllers';
import authenticateUsersControllers from './controllers/AuthenticateUsersControllers';
import createTasksControllers from './controllers/CreateTasksControllers';
import deleteTasksControllers from './controllers/DeleteTasksControllers';
import listTasksControllers from './controllers/ListTasksControllers';
import updateTasksControllers from './controllers/UpdateTasksControllers';
import createPerformanceControllers from './controllers/CreatePerformanceControllers';

import authMiddleware from './middlewares/authMiddleware';

const router = Router();

/** Users */
router.post('/register', createUsersControllers.handle);
router.post('/login', authenticateUsersControllers.handle);

/** Tasks */
router.post('/user/tasks', authMiddleware, createTasksControllers.handle);
router.delete('/user/tasks', authMiddleware, deleteTasksControllers.handle);
router.get('/user/tasks', authMiddleware, listTasksControllers.handle);
router.put('/user/tasks', authMiddleware, updateTasksControllers.handle);

/** Performance */
router.post('/user/performance', authMiddleware, createPerformanceControllers.handle);

export { router };
