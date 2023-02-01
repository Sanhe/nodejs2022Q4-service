import {
  DEFAULT_API_PORT,
  ENV_API_PORT_KEY,
  PARSE_INT_RADIX_10,
} from './defaults';

export default () => ({
  port:
    parseInt(process.env[ENV_API_PORT_KEY], PARSE_INT_RADIX_10) ||
    DEFAULT_API_PORT,
});
