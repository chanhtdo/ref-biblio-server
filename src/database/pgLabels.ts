import { pgPool } from "./pgPool";

export async function insert(label: string): Promise<Date> {
  const query = `SELECT * FROM udf_insert_label($1)`;
  return pgPool
    .query(query, [label])
    .then((res) => (res.rows[0] ? res.rows[0].createdDate : undefined));
}

export async function get(label: string): Promise<string> {
  const query = `SELECT * FROM udf_get_labels() WHERE label = $1`;
  return pgPool.query(query, [label]).then((res) => (res.rows[0] ? res.rows[0].label : undefined));
}

export async function remove(label: string): Promise<void> {
  await pgPool.query(`CALL usp_delete_label($1)`, [label]);
}
