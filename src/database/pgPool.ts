import { Pool, QueryArrayResult } from "pg";
import * as config from "../appSettings.json";

export const pgPool = new Pool(config.postgres);

export function query(text: any, values: any): Promise<QueryArrayResult<unknown[]>> {
  return pgPool.query(text, values);
}
