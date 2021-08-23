import { Request, Response } from 'express';

import { CreateTasksServices } from '../services/CreateTasksServices';

class CreateTasksControllers {
  async handle(req: Request, res: Response) {
    const { title, is_completed } = req.body;
    const { user_id } = req;

    const createTasksServices = new CreateTasksServices();
    const result = await createTasksServices.execute({
      title,
      is_completed,
      user_id,
    });

    return res.json({ message: result });
  }
}

export default new CreateTasksControllers();
