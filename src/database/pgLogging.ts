import * as pgPool from "./pgPool";
import { LoggingType } from "ts/enums/logging";

export async function insertLogging(
  type: LoggingType,
  source: string,
  message: string,
  details: Record<string, unknown>,
  retentionDays: number,
): Promise<void> {
  await pgPool.query(`CALL usp_insert_logging($1, $2, $3, $4, $5)`, [
    type,
    source,
    message,
    details,
    retentionDays,
  ]);
}
