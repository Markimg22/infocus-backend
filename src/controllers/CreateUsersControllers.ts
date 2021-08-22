import { Request, Response } from 'express';

import { CreateUsersServices } from '../services/CreateUsersServices';

class CreateUsersControllers {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUsersServices = new CreateUsersServices();
    const user = await createUsersServices.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export default new CreateUsersControllers();
