import { getConnection } from 'typeorm';

import { TokenRepositories } from '../../repositories/TokenRepositories';

class DeleteTokenService {
  async execute(user_id: string) {
    const tokenRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(TokenRepositories);

    // Token exists
    const token = await tokenRepositories.findOne({ user_id });

    if (!token) {
      throw new Error('Token not exists.');
    }

    // Remove token
    await tokenRepositories.remove(token);
  }
}

export { DeleteTokenService };
