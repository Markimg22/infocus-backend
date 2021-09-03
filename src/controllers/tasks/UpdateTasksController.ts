import { Request, Response } from 'express';

import { UpdateTasksService } from '../../services/tasks/UpdateTasksService';

class UpdateTasksController {
  async handle(req: Request, res: Response) {
    const { task_id } = req.body;
    const { user_id } = req;

    // Update task
    const updateTasksServices = new UpdateTasksService();
    const tasks = await updateTasksServices.execute({ task_id, user_id });

    return res.json(tasks);
  }
}

export default new UpdateTasksController();
