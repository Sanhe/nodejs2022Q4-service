import { ParseUUIDPipe } from '@nestjs/common';
import { DEFAULT_UUID_VERSION_NUMBER } from '../uuid/config';

const parseUUIDPipe = new ParseUUIDPipe({
  version: DEFAULT_UUID_VERSION_NUMBER,
});

export { parseUUIDPipe };
