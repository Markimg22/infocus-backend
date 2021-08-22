import { Request, Response } from 'express';

import { DeleteTasksServices } from '../services/DeleteTasksServices';

class DeleteTasksControllers {
  async handle(req: Request, res: Response) {
    const { task_id } = req.body;
    const { user_id } = req;

    const deleteTasksServices = new DeleteTasksServices();
    const tasks = await deleteTasksServices.execute({ task_id, user_id });

    return res.json(tasks);
  }
}

export default new DeleteTasksControllers();
