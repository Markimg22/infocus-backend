import { Request, Response } from 'express';

import { ListPerformanceServices } from '../services/ListPerformanceServices';

class ListPerformanceControllers {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // List performance
    const listPerformanceServices = new ListPerformanceServices();
    const performance = await listPerformanceServices.execute(user_id);

    return res.json(performance);
  }
}

export default new ListPerformanceControllers();
