import { getConnection } from 'typeorm';

import { TokenRepositories } from '../../repositories/TokenRepositories';

interface ICreateTokenRequest {
  hash: string;
  user_id: string;
}

class CreateTokenService {
  async execute({ hash, user_id }: ICreateTokenRequest) {
    const tokenRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(TokenRepositories);

    // If token already exists
    const tokenAlreadyExists = await tokenRepositories.findOne({ user_id });

    if (tokenAlreadyExists) {
      // Update token
      await tokenRepositories.update({ id: tokenAlreadyExists.id }, { hash });
    } else {
      // Create and save new token to database
      const token = tokenRepositories.create({ hash, user_id });
      await tokenRepositories.save(token);
    }
  }
}

export { CreateTokenService };
