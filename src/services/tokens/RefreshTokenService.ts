import { getConnection } from 'typeorm';

import { TokenRepositories } from '../../repositories/TokenRepositories';
import { CreateTokenService } from './CreateTokenService';

import { createToken } from '../../utils/create-token';

class RefreshTokenService {
  async execute(old_token: string) {
    const tokenRespositories = getConnection(process.env.NODE_ENV).getCustomRepository(TokenRepositories);

    // If token not exists
    const tokenAlreadyExists = await tokenRespositories.findOne({ hash: old_token });

    if (!tokenAlreadyExists) {
      throw new Error('Invalid token.');
    }

    // Create and save new token
    const new_token = await createToken(tokenAlreadyExists.user_id);

    const createTokenService = new CreateTokenService();
    await createTokenService.execute({ hash: new_token, user_id: tokenAlreadyExists.user_id });

    return { new_token };
  }
}

export { RefreshTokenService };
