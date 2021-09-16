import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getConnection } from 'typeorm';

import { TokenRepositories } from '../repositories/TokenRepositories';

interface ITokenPayload {
  sub: string;
}

const handleAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        error: 'Unauthorized.',
      });
    }

    const [, token] = authToken.split(' ');

    const { sub } = verify(token, process.env.TOKEN_SECRET) as ITokenPayload;

    // If token not valid
    const tokenRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(TokenRepositories);
    const tokenUser = await tokenRepositories.findOne({ user_id: sub });

    if (tokenUser.hash !== token) {
      return res.status(401).json({
        error: 'Unauthorized.',
      });
    }

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized.',
    });
  }
};

export { handleAuthenticate };
