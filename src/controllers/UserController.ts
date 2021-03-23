import { Request, Response } from 'express';

// import validator from 'validator';
// import bcryptjs from 'bcryptjs';

import User from '../models/User';

class UserController {
  public async getUser(req: Request, res: Response): Promise<Response> {
    const { userName } = req.params;
    const user = await User.findOne({ userName });

    return res.json(user);
  }

  // public async register(req: Request, res: Response): Promise<Response> {
  //   const {
  //     email, userName, password, confirmPassword,
  //   } = req.body;
  // }
}

export default new UserController();
