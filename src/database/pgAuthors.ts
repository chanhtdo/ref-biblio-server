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

export async function get(authorIds: number[]): Promise<Author[]> {
  const query = `SELECT * FROM udf_get_authors($1)`;
  return pgPool.query(query, [authorIds]).then((res) => res.rows);
}

export async function remove(authorIds: number[]): Promise<void> {
  await pgPool.query(`CALL usp_delete_authors($1)`, [authorIds]);
}
