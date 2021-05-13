import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import isEmail from 'validator/lib/isEmail';

import { User } from '../entities/User';

class UserController {
  async store(req: Request, res: Response) {
    try {
      const repository = getRepository(User);
      const { email, password, passwordAgain } = req.body;

      if (!isEmail(email)) {
        return res.status(409).json({
          errors: 'E-mail inválido',
        });
      }

      if (password === '') {
        return res.status(409).json({
          errors: 'Senha vazia',
        });
      }

      if (password !== passwordAgain) {
        return res.status(409).json({
          errors: 'Senhas diferentes',
        });
      }

      const userExits = await repository.findOne({ email });

      if (userExits) {
        return res.status(409).json({
          errors: 'Usuário já existe',
        });
      }

      const user = repository.create({ email, password });
      await repository.save(user);

      return res.json(user.email);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
}

export default new UserController();
