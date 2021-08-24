import { Router } from 'express';

import createUsersControllers from './controllers/users/CreateUsersControllers';
import authenticateUsersControllers from './controllers/users/AuthenticateUsersControllers';
import deleteUsersControllers from './controllers/users/DeleteUsersControllers';

import createTasksControllers from './controllers/tasks/CreateTasksControllers';
import deleteTasksControllers from './controllers/tasks/DeleteTasksControllers';
import listTasksControllers from './controllers/tasks/ListTasksControllers';
import updateTasksControllers from './controllers/tasks/UpdateTasksControllers';

import listPerformanceControllers from './controllers/performances/ListPerformanceControllers';
import updatePerformanceControllers from './controllers/performances/UpdatePerformanceControllers';

import authMiddleware from './middlewares/authMiddleware';

const router = Router();

/** Users */
router.post('/register', createUsersControllers.handle);
router.post('/login', authenticateUsersControllers.handle);
router.delete('/user', authMiddleware, deleteUsersControllers.handle);

/** Tasks */
router.post('/user/tasks', authMiddleware, createTasksControllers.handle);
router.delete('/user/tasks', authMiddleware, deleteTasksControllers.handle);
router.get('/user/tasks', authMiddleware, listTasksControllers.handle);
router.put('/user/tasks', authMiddleware, updateTasksControllers.handle);

/** Performance */
router.get('/user/performance', authMiddleware, listPerformanceControllers.handle);
router.put('/user/performance', authMiddleware, updatePerformanceControllers.handle);

export { router };
