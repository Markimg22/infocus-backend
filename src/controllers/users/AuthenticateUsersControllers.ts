import { Request, Response } from 'express';

import { AuthenticateUsersService } from '../../services/users/AuthenticateUsersServices';

class AuthenticateUsersControllers {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUsersService = new AuthenticateUsersService();
    const token = await authenticateUsersService.execute({ email, password });

    return res.json(token);
  }
}

export default new AuthenticateUsersControllers();
