import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';

class UsersController {
  async store(req: Request, res: Response) {
    try {
      const repository = getCustomRepository(UsersRepository);
      const { email, password } = req.body;

      const userExits = await repository.findOne({ email });

      if (userExits) {
        return res.status(409).json({
          errors: 'Usuário já existe',
        });
      }

      const user = repository.create({ email, password });
      await repository.save(user);

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err: Error) => err.message),
      });
    }
  }
}

export default new UsersController();
