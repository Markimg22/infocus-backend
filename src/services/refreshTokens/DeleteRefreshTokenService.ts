import { getConnection } from 'typeorm';

import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

class DeleteRefreshTokenService {
  async execute(user_id: string) {
    const refreshTokenRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(RefreshTokenRepositories);

    // Refresh token exists
    const refreshToken = await refreshTokenRepositories.findOne({ user_id });

    if (!refreshToken) {
      throw new Error('Refresh token not exists.');
    }

    // Remove refresh token
    await refreshTokenRepositories.remove(refreshToken);

    return 'Deleted refresh token.';
  }
}

export { DeleteRefreshTokenService };
