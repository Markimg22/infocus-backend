import { Router } from 'express';

import UserController from './controllers/UserController';

const routes = Router();

routes.get('/users/:userName', UserController.getUser);

// routes.post('/users/register', UserController.register);
// routes.post('/users/login', UserController.login);

// routes.get('users/:userName/performance', UserController.getPerformance);
// routes.put('user/:userName/performance', UserController.updatePerformance);

// routes.get('/users/:userName/tasks', TasksController.getTasks);
// routes.put('/users/:userName/tasks/:isCompleted', TasksController.editTask);
// routes.post('/users/:userName/tasks/:title', TasksController.createTask);
// routes.delete('/users/:userName/tasks/:title', TasksController.deleteTask);

export default routes;
