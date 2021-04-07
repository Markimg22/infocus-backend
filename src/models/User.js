import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'Campo obrigatório *' }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe'
        },
        validate: {
          isEmail: { msg: 'E-mail inválido' }
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          notEmpty: { msg: 'Campo obrigatório *' }
        }
      },
    }, {
      sequelize
    });

    this.addHook('beforeSave', async user => {
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });

    return this;
  }
}
