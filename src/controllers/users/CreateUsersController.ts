import { Request, Response } from 'express';

import { CreateUsersService } from '../../services/users/CreateUsersService';
import { CreatePerformanceService } from '../../services/performances/CreatePerformanceService';

class CreateUsersController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Create user
    const createUsersService = new CreateUsersService();
    const user = await createUsersService.execute({
      name,
      email,
      password,
    });

    // Create performance
    const createPerformanceService = new CreatePerformanceService();
    await createPerformanceService.execute(user.id);

    return res.json(user);
  }
}

export default new CreateUsersController();
