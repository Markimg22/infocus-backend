import { Request, Response } from 'express';

import { UpdateTasksServices } from '../services/UpdateTasksServices';

class UpdateTasksControllers {
  async handle(req: Request, res: Response) {
    const { task_id } = req.body;
    const { user_id } = req;

    const updateTasksServices = new UpdateTasksServices();
    const result = await updateTasksServices.execute({ task_id, user_id });

    return res.json({ message: result });
  }
}

export default new UpdateTasksControllers();
