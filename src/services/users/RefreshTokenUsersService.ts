import { getCustomRepository } from 'typeorm';

import { CreateTokenProvider } from '../../providers/CreateTokenProvider';
import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

class RefreshTokenUsersService {
  async execute(refresh_token: string) {
    const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

    // If not exists
    const refreshToken = await refreshTokenRepositories.findOne({ id: refresh_token });

    if (!refreshToken) {
      throw new Error('Refresh token invalid.');
    }

    // Generate new token
    const createTokenProvider = new CreateTokenProvider();
    const token = await createTokenProvider.execute(refreshToken.user_id);

    return token;
  }
}

export { RefreshTokenUsersService };
