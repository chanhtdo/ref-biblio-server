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

export async function list(
  search: string,
  limit: number,
  page: number,
): Promise<{ totalCount: number; filteredCount: number; labels: string[] }> {
  search = search && `%${search}%`;
  console.log(page, limit);
  const { totalCount } = await pgPool
    .query(`SELECT count(1) "totalCount" FROM udf_get_labels()`, [])
    .then((res) => res.rows[0]);

  const filteredCount = search
    ? await pgPool
        .query(`SELECT count(1) "filteredCount" FROM udf_get_labels($1)`, [search])
        .then((res) => res.rows[0].filteredCount)
    : totalCount;

  const { skip_rows: offset } = await pgPool
    .query(`SELECT skip_rows FROM udf_get_offset($1, $2, $3)`, [page, filteredCount, limit])
    .then((res) => res.rows[0]);

  const query = `SELECT label FROM udf_get_labels($1) ORDER BY label asc LIMIT $2 OFFSET $3`;
  return pgPool.query(query, [search, limit, offset]).then((res) => {
    return {
      totalCount,
      filteredCount,
      labels: res.rows.map((row) => row.label),
    };
  });
}
