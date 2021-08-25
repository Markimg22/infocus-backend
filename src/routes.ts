import { Router } from 'express';

import createUsersController from './controllers/users/CreateUsersController';
import authenticateUsersController from './controllers/users/AuthenticateUsersController';
import deleteUsersController from './controllers/users/DeleteUsersController';
import refreshTokenUsersController from './controllers/users/RefreshTokenUsersController';

import createTasksController from './controllers/tasks/CreateTasksController';
import deleteTasksController from './controllers/tasks/DeleteTasksController';
import listTasksControllers from './controllers/tasks/ListTasksController';
import updateTasksController from './controllers/tasks/UpdateTasksController';

import listPerformanceController from './controllers/performances/ListPerformanceController';
import updatePerformanceController from './controllers/performances/UpdatePerformanceController';

import { handleAuthenticate } from './middlewares/handleAuthenticate';

const router = Router();

/** Users */
router.post('/register', createUsersController.handle);
router.post('/login', authenticateUsersController.handle);
router.delete('/user', handleAuthenticate, deleteUsersController.handle);
router.post('/refresh-token', refreshTokenUsersController.handle);

/** Tasks */
router.post('/user/tasks', handleAuthenticate, createTasksController.handle);
router.delete('/user/tasks', handleAuthenticate, deleteTasksController.handle);
router.get('/user/tasks', handleAuthenticate, listTasksControllers.handle);
router.put('/user/tasks', handleAuthenticate, updateTasksController.handle);

/** Performance */
router.get('/user/performance', handleAuthenticate, listPerformanceController.handle);
router.put('/user/performance', handleAuthenticate, updatePerformanceController.handle);

export { router };
