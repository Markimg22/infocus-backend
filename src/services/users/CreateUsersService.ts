import { getConnection } from 'typeorm';
import { hash } from 'bcryptjs';
import validator from 'validator';

import { UsersRepositories } from '../../repositories/UsersRepositories';

import { CreatePerformanceService } from '../performances/CreatePerformanceService';
import { AuthenticateUsersService } from './AuthenticateUsersService';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUsersService {
  async execute({ name, email, password }: IUserRequest) {
    const usersRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(UsersRepositories);

    // Validate fields
    if (!name) {
      throw new Error('Name is required.');
    }

    if (!email || !validator.isEmail(email)) {
      throw new Error('E-mail incorrect.');
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

    // Create performance
    const createPerformanceService = new CreatePerformanceService();
    await createPerformanceService.execute(user.id);

    // Authenticate user
    const authenticateUsersService = new AuthenticateUsersService();
    const result = await authenticateUsersService.execute({ email, password });

    return result;
  }
}

export { CreateUsersService };
