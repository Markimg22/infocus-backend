import { getCustomRepository } from 'typeorm';

import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

import { createToken } from '../../utils/create-token';

class RefreshTokenUsersService {
  async execute(refresh_token: string) {
    const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

    // If not exists
    const refreshToken = await refreshTokenRepositories.findOne({ id: refresh_token });

    if (!refreshToken) {
      throw new Error('Refresh token invalid.');
    }

    // Create new token
    const token = await createToken(refreshToken.user_id);

    return token;
  }
}

export { RefreshTokenUsersService };
