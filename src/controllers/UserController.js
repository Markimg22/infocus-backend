import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch(e) {
      return res.status(400).json({
        errors: e.erros.map(err => err.message)
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      return res.json(user);
    } catch(e) {
      return res.status(400).json({
        errors: e.erros.map(err => err.message)
      });
    }
  }

  async create(req, res) {
    try {
      const body = req.body;
      const user = await User.create(body);

      return res.json(user);
    } catch(e) {
      return res.status(400).json({
        errors: e.erros.map(err => err.message)
      });
    }
	}
}

export default new UserController();
