import { Request, Response } from 'express';

import { RefreshTokenService } from '../../services/tokens/RefreshTokenService';

class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const { old_token } = req.body;

    const refreshTokenService = new RefreshTokenService();
    const new_token = await refreshTokenService.execute(old_token);

    return res.json(new_token);
  }
}

export default new RefreshTokenController();
