import bcrypt from 'bcrypt';

export const bcryptService = {
  hash: async (plain: string) => {
    const saltRounds = 10;
    return bcrypt.hash(plain, saltRounds);
  },
  compare: async (plain: string, hash: string) => {
    return bcrypt.compare(plain, hash);
  },
};
