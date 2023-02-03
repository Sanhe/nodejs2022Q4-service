import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DEFAULT_ENV_FILES } from '../config/defaults';
import configuration from '../config/configuration';
import { ConfigurationService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: DEFAULT_ENV_FILES,
      load: [configuration],
    }),
  ],
  providers: [ConfigurationService, ConfigService],
  exports: [ConfigurationService, ConfigService],
})
export class ConfigurationModule {}
