import { Reference } from "ts/types/references";
import { pgPool } from "./pgPool";

export async function insert(
  reference: Partial<Reference>,
): Promise<{ referenceId: number; createdDate: Date }> {
  const query = `SELECT * FROM udf_insert_bibliographic_reference($1, $2, $3, $4, $5)`;
  return pgPool
    .query(query, [
      reference.title,
      reference.description,
      reference.scientificJournal,
      reference.year,
      reference.link,
    ])
    .then((res) => res.rows[0]);
}
