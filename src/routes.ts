import { Router } from 'express';

import createUsersControllers from './controllers/users/CreateUsersControllers';
import authenticateUsersControllers from './controllers/users/AuthenticateUsersControllers';

import createTasksControllers from './controllers/tasks/CreateTasksControllers';
import deleteTasksControllers from './controllers/tasks/DeleteTasksControllers';
import listTasksControllers from './controllers/tasks/ListTasksControllers';
import updateTasksControllers from './controllers/tasks/UpdateTasksControllers';

import createPerformanceControllers from './controllers/performances/CreatePerformanceControllers';
import listPerformanceControllers from './controllers/performances/ListPerformanceControllers';

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
router.get('/user/performance', authMiddleware, listPerformanceControllers.handle);

export { router };
