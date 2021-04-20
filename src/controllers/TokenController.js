import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async create(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      // Check if email and password not empty
      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais inválidas.'],
        });
      }

      // Check if user is exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      // Check if password is correct
      if (!(await user.passwordIsValid(password))) {
        return res.status(400).json({
          errors: ['Senha incorreta.'],
        });
      }

      /// Create token for login
      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new TokenController();
