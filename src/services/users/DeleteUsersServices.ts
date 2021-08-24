import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from '../../repositories/UsersRepositories';

export class DeleteUsersServices {
  async execute(user_id: string) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // User exists
    const user = await usersRepositories.findOne({ id: user_id });

    if (!user) {
      throw new Error('User not exists.');
    }

    // Remove user
    await usersRepositories.remove(user);

    return 'Deleted user.';
  }
}
