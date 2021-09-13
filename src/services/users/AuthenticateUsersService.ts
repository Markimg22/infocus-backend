import { getConnection } from 'typeorm';
import { compare } from 'bcryptjs';

import { UsersRepositories } from '../../repositories/UsersRepositories';
import { CreateTokenService } from '../tokens/CreateTokenService';
import { createToken } from '../../utils/create-token';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUsersService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(UsersRepositories);

    // Remove white spaces
    email = email.trim();
    password = email.trim();

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

    // Save token in database
    const createTokenService = new CreateTokenService();
    await createTokenService.execute(
      {
        hash: token,
        user_id: user.id,
      },
    );

    return { user: { email: user.email, name: user.name }, token };
  }
}

export { AuthenticateUsersService };
