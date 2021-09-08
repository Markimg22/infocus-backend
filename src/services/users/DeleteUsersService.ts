import { getConnection } from 'typeorm';

import { UsersRepositories } from '../../repositories/UsersRepositories';

class DeleteUsersService {
  async execute(user_id: string) {
    const usersRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(UsersRepositories);

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

export { DeleteUsersService };
