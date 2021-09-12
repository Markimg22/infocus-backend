import { Request, Response } from 'express';

import { AuthenticateUsersService } from '../../services/users/AuthenticateUsersService';

class AuthenticateUsersController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    // Authenticate user
    const authenticateUsersService = new AuthenticateUsersService();
    const result = await authenticateUsersService.execute({ email, password });

    return res.json(result);
  }
}

export default new AuthenticateUsersController();
