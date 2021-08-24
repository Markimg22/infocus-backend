import { Request, Response } from 'express';

import { UpdatePerformanceServices } from '../../services/performances/UpdatePerformanceServices';

class UpdatePerformanceControllers {
  async handle(req: Request, res: Response) {
    const { value, data_to_update } = req.body;
    const { user_id } = req;

    const updatePerformanceServices = new UpdatePerformanceServices();
    const result = await updatePerformanceServices.execute({ user_id, value, data_to_update });

    return res.json({ message: result });
  }
}

export default new UpdatePerformanceControllers();
