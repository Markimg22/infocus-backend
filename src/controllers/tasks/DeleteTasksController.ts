import { Request, Response } from 'express';

import { DeleteTasksService } from '../../services/tasks/DeleteTasksService';

class DeleteTasksController {
  async handle(req: Request, res: Response) {
    const { task_id } = req.body;
    const { user_id } = req;

    // Delete task
    const deleteTasksServices = new DeleteTasksService();
    const result = await deleteTasksServices.execute({ task_id, user_id });

    return res.json({ message: result });
  }
}

export default new DeleteTasksController();
