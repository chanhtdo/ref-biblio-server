import { pgPool } from "./pgPool";

export async function insert(label: string): Promise<Date> {
  const query = `SELECT * FROM udf_insert_label($1)`;
  return pgPool
    .query(query, [label])
    .then((res) => (res.rows[0] ? res.rows[0].createdDate : undefined));
}
