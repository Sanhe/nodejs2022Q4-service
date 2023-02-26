import {
  DEFAULT_API_PORT,
  DEFAULT_LOG_LEVEL,
  ENV_API_PORT_KEY,
  ENV_LOG_LEVEL_KEY,
  ENV_USE_INITIAL_DATA,
  PARSE_INT_RADIX_10,
} from './defaults';
import * as process from 'process';

export default () => ({
  port:
    parseInt(process.env[ENV_API_PORT_KEY], PARSE_INT_RADIX_10) ||
    DEFAULT_API_PORT,
  useInitialData: process.env[ENV_USE_INITIAL_DATA] === 'true',
  logLevel: +process.env[ENV_LOG_LEVEL_KEY] || DEFAULT_LOG_LEVEL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'secret123123',
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY ?? 'secret123123',
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME ?? '1h',
  TOKEN_REFRESH_EXPIRE_TIME: process.env.TOKEN_REFRESH_EXPIRE_TIME ?? '1d',
});
