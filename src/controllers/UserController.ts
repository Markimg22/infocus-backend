import { Request, Response } from 'express';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';

import { UserModel } from '../models/User';

class UserController {
  async store(req: Request, res: Response) {
    try {
      // eslint-disable-next-line prefer-const
      let { email, password, passwordAgain } = req.body;

      if (!isEmail(email)) {
        return res.status(409).json({
          errors: 'E-mail inválido.',
        });
      }

      if (password === '') {
        return res.status(409).json({
          errors: 'Senha vazia.',
        });
      }

      if (password !== passwordAgain) {
        return res.status(409).json({
          errors: 'Senhas diferentes.',
        });
      }

      const userExits = await UserModel.findOne({ email });

      if (userExits) {
        return res.status(409).json({
          errors: 'Usuário já existe.',
        });
      }

      password = bcrypt.hashSync(password, 8);

      const user = await UserModel.create({ email, password });

      return res.json(user.email);
    } catch (e) {
      return res.status(400).json({ errors: 'Houve um erro ao registrar usuário.' });
    }
  }
}

export default new UserController();
