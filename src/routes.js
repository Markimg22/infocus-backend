import { Router } from 'express';

import userController from './controllers/UserController';

const router = Router();

/** Users */
router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.post('/users/register', userController.create);

export { router };


/**
 * index -> listar tudo -> GET
 * store/create -> criar -> POST
 * delete -> apagar -> DELETE
 * show -> listar um -> GET
 * update -> atualizar -> PUT
 */
