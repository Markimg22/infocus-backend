import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUsersService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Validate fields
    if (!email || !password) {
      throw new Error('E-mail/Password is required.');
    }

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error('E-mail/Password is incorrect.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('E-mail/Password is incorrect.');
    }

    // Generate token
    const token = sign(
      {
        email: user.email,
      },
      process.env.TOKEN_SECRET,
      {
        subject: user.id,
        expiresIn: process.env.TOKEN_EXPIRES,
      },
    );

    return token;
  }
}
