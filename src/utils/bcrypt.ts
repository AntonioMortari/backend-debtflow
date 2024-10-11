import * as bcrypt from 'bcrypt';
const SALT = 10;

const hash = async (data: string) => {
  const result = await bcrypt.hash(data, SALT);

  return result;
};

const compare = async (data: string, hash: string) => {
  const isMatch = await bcrypt.compare(data, hash);

  return isMatch;
};

export const hashService = {
  compare,
  hash,
};
