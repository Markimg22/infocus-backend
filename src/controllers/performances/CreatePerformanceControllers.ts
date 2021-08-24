import { Request, Response } from 'express';

import { CreatePerformanceServices } from '../../services/performances/CreatePerformanceServices';

class CreatePerformanceControllers {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // Create performance
    const createPerformanceServices = new CreatePerformanceServices();
    const performance = await createPerformanceServices.execute(user_id);

    return res.json(performance);
  }
}

export default new CreatePerformanceControllers();
