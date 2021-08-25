import { getCustomRepository } from 'typeorm';
import dayjs from 'dayjs';

import { RefreshTokenRepositories } from '../../repositories/RefreshTokenRepositories';

class CreateRefreshTokenService {
  async execute(user_id: string) {
    const refreshTokenRepositories = getCustomRepository(RefreshTokenRepositories);

    // Refresh token already exists
    const refreshTokenAlreadyExists = await refreshTokenRepositories.findOne({ user_id });

    if (refreshTokenAlreadyExists) {
      throw new Error('Refresh token already exists.');
    }

    // Expires in
    const expires_in = dayjs().add(15, 'second').unix();

    // Create and save refresh token
    const refreshToken = refreshTokenRepositories.create({ user_id, expires_in });
    await refreshTokenRepositories.save(refreshToken);

    return refreshToken;
  }
}

export { CreateRefreshTokenService };
