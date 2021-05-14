import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserModel } from '../models/User';

class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({
          errors: 'Usuário não existe',
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          errors: 'Senha incorreta',
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

      delete user.password;

      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
}

export default new AuthController();
