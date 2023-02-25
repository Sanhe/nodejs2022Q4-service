import { readdir, appendFile, stat, access, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { Injectable } from '@nestjs/common';
import * as process from 'process';

@Injectable()
export class LoggerToFileService {
  private async saveLog(message: string, type: string) {
    const defaultLogPath = './logs';
    const datetime = new Date().toISOString();
    const logMessage = `${datetime} ${message}`;
    const logMessageWithNewLine = `${logMessage}\r`;

    const maxFileSize = (+process.env.LOG_MAX_FILE_SIZE ?? 1024) * 1024;

    const logPathProvided = process.env.LOG_PATH ?? defaultLogPath;
    const logPath = join(__dirname, '..', '..', '..', logPathProvided);

    if (!existsSync(logPath)) {
      await mkdir(logPath, { recursive: true });
    }

    const existingFiles = await readdir(logPath);
    const lastFileFounded = existingFiles
      .slice()
      .reverse()
      .find((file) => {
        const fileType = file.split('-')[0];

        return fileType.includes(type);
      });

    const lastFile = lastFileFounded ?? `${type}-1.log`;
    const logFilePath = join(logPath, lastFile);

    try {
      const stats = await stat(logFilePath);

      if (stats.size > maxFileSize) {
        const fileNumber = +lastFile.split('-')[1].split('.')[0];
        const nextFileNumber = fileNumber + 1;
        const newLogFile = `${type}-${nextFileNumber}.log`;
        const newLogFilePath = join(logPath, newLogFile);

        await appendFile(newLogFilePath, logMessageWithNewLine, {
          encoding: 'utf8',
        });
      } else {
        await appendFile(logFilePath, logMessageWithNewLine, {
          encoding: 'utf8',
        });
      }
    } catch (error) {
      await appendFile(logFilePath, logMessageWithNewLine, {
        encoding: 'utf8',
      });
      return;
    }
  }

  async log(message: string, ...optionalParams: any[]) {
    await this.saveLog(message, 'log');
  }

  async error(message: string, ...optionalParams: any[]) {
    await this.saveLog(message, 'error');
  }

  async warn(message: string, ...optionalParams: any[]) {
    await this.saveLog(message, 'warn');
  }

  async debug(message: string, ...optionalParams: any[]) {
    await this.saveLog(message, 'debug');
  }

  async verbose(message: string, ...optionalParams: any[]) {
    await this.saveLog(message, 'verbose');
  }
}
