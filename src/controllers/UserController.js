import User from '../models/User';

class UserController {
  async show(req, res) {
    const user = await User.create({
      name: 'User Example',
      email: 'user@hotmail.com',
      password: '123',
    });

    res.json(user);
	}
}

export default new UserController();
