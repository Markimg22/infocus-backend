import { Request, Response } from 'express';

import { ListTermService } from '../../services/terms/ListTermService';

class ListTermController {
  async handle(req: Request, res: Response) {
    // List terms
    const listTermServices = new ListTermService();
    const terms = await listTermServices.execute();

    return res.json(terms);
  }
}

export default new ListTermController();
