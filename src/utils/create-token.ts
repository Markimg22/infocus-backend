import { sign } from 'jsonwebtoken';

const createToken = async (user_id: string) => {
  const token = sign(
    {},
    process.env.TOKEN_SECRET,
    {
      subject: user_id,
      expiresIn: process.env.TOKEN_EXPIRES,
    },
  );

  return { token };
};

export { createToken };
