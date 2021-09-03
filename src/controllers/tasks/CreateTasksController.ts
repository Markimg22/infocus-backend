import { Request, Response } from 'express';

import { CreateTasksService } from '../../services/tasks/CreateTasksService';

class CreateTasksController {
  async handle(req: Request, res: Response) {
    const { title, is_completed } = req.body;
    const { user_id } = req;

    // Create task
    const createTasksServices = new CreateTasksService();
    const tasks = await createTasksServices.execute({
      title,
      is_completed,
      user_id,
    });

    return res.json(tasks);
  }
}

export default new CreateTasksController();
