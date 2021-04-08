import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe']
        })
      }

      const { id, name, email } = user;

      return res.json({ id, name, email });
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async create(req, res) {
    try {
      const user = await User.create(req.body);
      const { id, name, email } = user

      return res.json({ id, name, email });
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
	}

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      const newDatas = await user.update(req.body);
      const { id, name, email } = newDatas;

      return res.json({ id, name, email });
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }
}

export default new UserController();
