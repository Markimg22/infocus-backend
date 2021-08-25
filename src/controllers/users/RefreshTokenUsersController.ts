import { Request, Response } from 'express';

import { RefreshTokenUsersService } from '../../services/users/RefreshTokenUsersService';

class RefreshTokenUsersController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    // Create user refresh token
    const refreshTokenUsersService = new RefreshTokenUsersService();
    const refreshToken = await refreshTokenUsersService.execute(refresh_token);

    return res.json(refreshToken);
  }
}

export default new RefreshTokenUsersController();
