import { Router } from 'express';

import userController from './controllers/UserController';
import authController from './controllers/AuthController';
import taskController from './controllers/TaskController';
import performanceController from './controllers/PerformanceController';

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

/** Performance */
router.get('/user/performance', authMiddleware, performanceController.show);
router.put('/performance/totalTasksCompleted', authMiddleware, performanceController.updateTotalTasksCompleted);
router.put('/performance/totalWorkingTime', authMiddleware, performanceController.updateTotalWorkingTime);
router.put('/performance/totalRestTime', authMiddleware, performanceController.updateTotalRestTime);

export { router };
