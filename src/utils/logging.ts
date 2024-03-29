import chalk from "chalk";
import * as config from "appSettings.json";
import { pgLogging } from "database";
import { LoggingType } from "ts/enums/logging";

export function LogMessage(
  message: string,
  source: string,
  details?: Record<string, unknown>,
  type: LoggingType = LoggingType.Error,
): void {
  const dtFormat = config.dateTimeFormat as Intl.DateTimeFormatOptions;
  const msg = new Intl.DateTimeFormat("default", dtFormat).format(new Date()) + ": ### Error ";
  console.log(chalk.red(msg) + message);

  if (config.logs.enableLoggingType.includes(type)) {
    //Log message into database
    pgLogging.insertLogging(type, source, msg + message, details, config.logs.retentionDays);
  }
}
