import { Request, Response } from 'express';

import { ListTasksService } from '../../services/tasks/ListTasksService';

class ListTasksController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // List tasks
    const listTasksServices = new ListTasksService();
    const tasks = await listTasksServices.execute(user_id);

    return res.json(tasks);
  }
}

export default new ListTasksController();
