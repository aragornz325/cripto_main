import { registerAs } from '@nestjs/config';

const { API_KEY } = process.env

export default registerAs('configEnv', () => {
  return {
    apiKey: API_KEY,
  };
});
