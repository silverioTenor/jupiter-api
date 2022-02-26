import { secret } from './../../database/jwtConfig';

export default {
  jwt: {
    secret,
    expiresIn: '1d',
  },
};
