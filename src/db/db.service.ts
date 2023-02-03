import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_KEY } from './names.providers';
import DB from './db';

@Injectable()
export class DbService {
  constructor(@Inject(STORAGE_KEY) public readonly db: DB) {}
}
