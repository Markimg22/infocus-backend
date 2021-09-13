import { Request, Response } from 'express';

import { DeleteUsersService } from '../../services/users/DeleteUsersService';

class DeleteUsersController {
  // eslint-disable-next-line no-unused-vars
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // Delete user
    const deleteUsersService = new DeleteUsersService();
    await deleteUsersService.execute(user_id);
  }
}

export default new DeleteUsersController();
