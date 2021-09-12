import { Request, Response } from 'express';

import { CreateUsersService } from '../../services/users/CreateUsersService';

class CreateUsersController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Create user
    const createUsersService = new CreateUsersService();
    const result = await createUsersService.execute({
      name,
      email,
      password,
    });

    return res.json(result);
  }
}

export default new CreateUsersController();
