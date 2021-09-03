import { Request, Response } from 'express';

import { DeleteTasksService } from '../../services/tasks/DeleteTasksService';

class DeleteTasksController {
  async handle(req: Request, res: Response) {
    const { task_id } = req.body;
    const { user_id } = req;

    // Delete task
    const deleteTasksServices = new DeleteTasksService();
    const tasks = await deleteTasksServices.execute({ task_id, user_id });

    return res.json(tasks);
  }
}

export default new DeleteTasksController();
