import { sign } from 'jsonwebtoken';

class CreateTokenProvider {
  async execute(user_id: string) {
    // Create token
    const token = sign(
      {},
      process.env.TOKEN_SECRET,
      {
        subject: user_id,
        expiresIn: process.env.TOKEN_EXPIRES,
      },
    );

    return { token };
  }
}

export { CreateTokenProvider };
