import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { UsersRepositories } from '../../repositories/UsersRepositories';

import { CreateTokenProvider } from '../../providers/CreateTokenProvider';
import { CreateRefreshTokenService } from '../refreshTokens/CreateRefreshTokenService';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUsersService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Validate fields
    if (!email || !password) {
      throw new Error('E-mail or password is required.');
    }

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error('E-mail or password is incorrect.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('E-mail or password is incorrect.');
    }

    // Create token
    const createTokenProvider = new CreateTokenProvider();
    const token = await createTokenProvider.execute(user.id);

    // Create refresh token
    const createRefreshTokenService = new CreateRefreshTokenService();
    await createRefreshTokenService.execute(user.id);

    return token;
  }
}

export { AuthenticateUsersService };
