import {
  DEFAULT_API_PORT,
  DEFAULT_LOG_LEVELS,
  ENV_API_PORT_KEY,
  ENV_LOG_LEVELS_KEY,
  ENV_USE_INITIAL_DATA,
  PARSE_INT_RADIX_10,
} from './defaults';
import * as process from 'process';

export default () => ({
  port:
    parseInt(process.env[ENV_API_PORT_KEY], PARSE_INT_RADIX_10) ||
    DEFAULT_API_PORT,
  useInitialData: process.env[ENV_USE_INITIAL_DATA] === 'true',
  logLevels: (() => {
    const envLogLevels = process.env[ENV_LOG_LEVELS_KEY] || DEFAULT_LOG_LEVELS;

    return envLogLevels.split(',');
  })(),
});
