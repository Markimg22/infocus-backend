import { Request, Response } from 'express';

import { DeleteUsersService } from '../../services/users/DeleteUsersService';

class DeleteUsersController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // Delete user
    const deleteUsersService = new DeleteUsersService();
    await deleteUsersService.execute(user_id);

    return res.json({
      message: 'User deleted.',
    });
  }
}

export default new DeleteUsersController();
