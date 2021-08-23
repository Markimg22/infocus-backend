import { Request, Response } from 'express';

import { ListTasksServices } from '../services/ListTasksServices';

class ShowTasksControllers {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const showTasksServices = new ListTasksServices();
    const tasks = await showTasksServices.execute(user_id);

    return res.json(tasks);
  }
}

export default new ShowTasksControllers();
