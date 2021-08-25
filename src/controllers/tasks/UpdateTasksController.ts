import { Request, Response } from 'express';

import { UpdateTasksService } from '../../services/tasks/UpdateTasksService';

class UpdateTasksController {
  async handle(req: Request, res: Response) {
    const { task_id } = req.body;
    const { user_id } = req;

    const updateTasksServices = new UpdateTasksService();
    const result = await updateTasksServices.execute({ task_id, user_id });

    return res.json({ message: result });
  }
}

export default new UpdateTasksController();
