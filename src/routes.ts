import { Router } from 'express';

import createUsersController from './controllers/users/CreateUsersController';
import authenticateUsersController from './controllers/users/AuthenticateUsersController';
import deleteUsersController from './controllers/users/DeleteUsersController';

import refreshTokenController from './controllers/tokens/RefreshTokenController';

import createTasksController from './controllers/tasks/CreateTasksController';
import deleteTasksController from './controllers/tasks/DeleteTasksController';
import listTasksControllers from './controllers/tasks/ListTasksController';
import updateTasksController from './controllers/tasks/UpdateTasksController';

import listPerformanceController from './controllers/performances/ListPerformanceController';
import updatePerformanceController from './controllers/performances/UpdatePerformanceController';

import listTermController from './controllers/terms/ListTermController';

import { handleAuthenticate } from './middlewares/handleAuthenticate';

const router = Router();

/** Users */
router.post('/register', createUsersController.handle);
router.post('/login', authenticateUsersController.handle);
router.delete('/delete-user', handleAuthenticate, deleteUsersController.handle);

/** Token */
router.put('/refresh-token', refreshTokenController.handle);

/** Tasks */
router.post('/create-task', handleAuthenticate, createTasksController.handle);
router.delete('/delete-task', handleAuthenticate, deleteTasksController.handle);
router.get('/list-tasks', handleAuthenticate, listTasksControllers.handle);
router.put('/update-task', handleAuthenticate, updateTasksController.handle);

/** Performance */
router.get('/list-performance', handleAuthenticate, listPerformanceController.handle);
router.put('/update-performance', handleAuthenticate, updatePerformanceController.handle);

/** Term */
router.get('/terms', listTermController.handle);

export { router };
