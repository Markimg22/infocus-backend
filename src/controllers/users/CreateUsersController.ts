import { Request, Response } from 'express';

import { CreateUsersService } from '../../services/users/CreateUsersService';
import { CreatePerformanceService } from '../../services/performances/CreatePerformanceService';

class CreateUsersController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Create user
    const createUsersServices = new CreateUsersService();
    const user = await createUsersServices.execute({
      name,
      email,
      password,
    });

    // Create performance
    const createPerformanceServices = new CreatePerformanceService();
    const performance = await createPerformanceServices.execute(user.id);

    delete performance.user_id;

    return res.json({ user, performance });
  }
}

export default new CreateUsersController();
