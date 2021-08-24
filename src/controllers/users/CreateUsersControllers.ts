import { Request, Response } from 'express';

import { CreateUsersServices } from '../../services/users/CreateUsersServices';
import { CreatePerformanceServices } from '../../services/performances/CreatePerformanceServices';

class CreateUsersControllers {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Create user
    const createUsersServices = new CreateUsersServices();
    const user = await createUsersServices.execute({
      name,
      email,
      password,
    });

    // Create performance
    const createPerformanceServices = new CreatePerformanceServices();
    const performance = await createPerformanceServices.execute(user.id);

    delete performance.user_id;
    delete performance.created_at;
    delete performance.updated_at;

    return res.json({ user, performance });
  }
}

export default new CreateUsersControllers();
