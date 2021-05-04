import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UsersRepository } from '../repositories/UsersRepository';

class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const repository = getCustomRepository(UsersRepository);
      const { email, password } = req.body;

      const user = await repository.findOne({ email });

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
      return res.status(400).json({
        errors: e.errors.map((err: Error) => err.message),
      });
    }
  }
}

export default new AuthController();
