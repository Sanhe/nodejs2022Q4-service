import { compare, hash } from 'bcrypt';

const DEFAULT_SALT = 10;

const getHash = async (str: string): Promise<string> => {
  const hashed = hash(str, +process.env.CRYPT_SALT ?? DEFAULT_SALT);

  return hashed;
};

const isPlainEqualHash = async (
  plain: string,
  hash: string,
): Promise<boolean> => {
  const isSame = compare(plain, hash);

  return isSame;
};

export { getHash, isPlainEqualHash };
