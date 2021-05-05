import { Request, Response } from 'express';

class HomeController {
  async index(req: Request, res: Response) {
    return res.json({ message: 'Connected' });
  }
}

export default new HomeController();
