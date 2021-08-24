import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import validator from 'validator';

import { UsersRepositories } from '../../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUsersServices {
  async execute({ name, email, password }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Validate fields
    if (!name) {
      throw new Error('Name is required.');
    }

    if (!email || !validator.isEmail(email)) {
      throw new Error('Email incorrect.');
    }

    if (!password || password.length < 5) {
      throw new Error('Password is required and greater than 5 characters.');
    }

    // Validate user already exists
    const userAlreadyExists = await usersRepositories.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    // Hash password
    const passwordHash = await hash(password, 8);

    // Create user
    const user = usersRepositories.create({
      name,
      email,
      password: passwordHash,
    });

    await usersRepositories.save(user);

    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    return user;
  }
}

export { CreateUsersServices };
