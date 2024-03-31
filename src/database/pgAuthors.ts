import { pgPool } from "./pgPool";
import { Author } from "ts/types/authors";

export async function insert(author: Author): Promise<{ authorId: number; createdDate: Date }> {
  const query = `SELECT * FROM udf_insert_author($1, $2, $3, $4, $5, $6)`;
  return pgPool
    .query(query, [
      author.firstName,
      author.middleName,
      author.lastName,
      author.affiliations,
      author.email,
      author.researchFields,
    ])
    .then((res) => res.rows[0]);
}

export async function update(author: Author): Promise<void> {
  await pgPool.query(`CALL usp_update_author($1, $2, $3, $4, $5, $6, $7)`, [
    author.authorId,
    author.firstName,
    author.middleName,
    author.lastName,
    author.affiliations,
    author.email,
    author.researchFields,
  ]);
}

export async function get(authorId: number): Promise<Author> {
  const query = `SELECT * FROM udf_get_authors() WHERE "authorId" = $1`;
  return pgPool.query(query, [authorId]).then((res) => res.rows[0]);
}

export async function remove(authorIds: number[]): Promise<void> {
  await pgPool.query(`CALL usp_delete_authors($1)`, [authorIds]);
}

export async function list(
  search: string,
  limit: number,
  page: number,
): Promise<{ totalCount: number; filteredCount: number; authors: Author[] }> {
  search = search && `%${search}%`;

  const { totalCount } = await pgPool
    .query(`SELECT count(1) "totalCount" FROM udf_list_authors()`, [])
    .then((res) => res.rows[0]);

  const filteredCount = search
    ? await pgPool
        .query(`SELECT count(1) "filteredCount" FROM udf_list_authors($1)`, [search])
        .then((res) => res.rows[0].filteredCount)
    : totalCount;

  const { skip_rows: offset } = await pgPool
    .query(`SELECT skip_rows FROM udf_get_offset($1, $2, $3)`, [page, filteredCount, limit])
    .then((res) => res.rows[0]);

  const query = `SELECT * FROM udf_list_authors($1) ORDER BY "firstName" asc LIMIT $2 OFFSET $3`;
  return pgPool.query(query, [search, limit, offset]).then((res) => {
    return {
      totalCount,
      filteredCount,
      authors: res.rows,
    };
  });
}
