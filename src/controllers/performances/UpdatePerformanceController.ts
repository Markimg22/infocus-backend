import { Request, Response } from 'express';

import { UpdatePerformanceService } from '../../services/performances/UpdatePerformanceService';

class UpdatePerformanceController {
  async handle(req: Request, res: Response) {
    const { value, data_to_update } = req.body;
    const { user_id } = req;

    const updatePerformanceService = new UpdatePerformanceService();
    const result = await updatePerformanceService.execute({ user_id, value, data_to_update });

    return res.json({ message: result });
  }
}

export default new UpdatePerformanceController();
