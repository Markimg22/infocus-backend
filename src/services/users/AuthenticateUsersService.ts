import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { UsersRepositories } from '../../repositories/UsersRepositories';
import { CreateRefreshTokenService } from '../refreshTokens/CreateRefreshTokenService';

import { createToken } from '../../utils/create-token';

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
    const token = await createToken(user.id);

    // Create refresh token
    const createRefreshTokenService = new CreateRefreshTokenService();
    await createRefreshTokenService.execute(user.id);

    return token;
  }
}

export { AuthenticateUsersService };
