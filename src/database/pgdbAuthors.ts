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
