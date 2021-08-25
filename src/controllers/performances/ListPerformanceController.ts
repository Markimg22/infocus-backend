import { Request, Response } from 'express';

import { ListPerformanceService } from '../../services/performances/ListPerformanceService';

class ListPerformanceController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // List performance
    const listPerformanceService = new ListPerformanceService();
    const performance = await listPerformanceService.execute(user_id);

    return res.json(performance);
  }
}

export default new ListPerformanceController();
