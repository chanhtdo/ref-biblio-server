import postAuthor from "./postAuthor";
import putAuthor from "./putAuthor";
import deleteAuthor from "./deleteAuthor";

module.exports = {
  "/api/v1/authors": { POST: { ...postAuthor } },
  "/api/v1/authors/:id": { PUT: { ...putAuthor }, DELETE: { ...deleteAuthor } },
};
