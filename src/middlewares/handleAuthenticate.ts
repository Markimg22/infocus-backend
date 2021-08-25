import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  sub: string;
}

const handleAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      error: 'Unauthorized',
    }).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET) as ITokenPayload;
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
    }).end();
  }
};

export { handleAuthenticate };
