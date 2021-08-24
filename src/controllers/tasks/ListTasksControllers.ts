import { Request, Response } from 'express';

import { ListTasksServices } from '../../services/tasks/ListTasksServices';

class ListTasksControllers {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // List tasks
    const listTasksServices = new ListTasksServices();
    const tasks = await listTasksServices.execute(user_id);

    return res.json(tasks);
  }
}

export default new ListTasksControllers();
