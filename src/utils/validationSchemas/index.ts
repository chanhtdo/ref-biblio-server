import postAuthor from "./authors/postAuthor";
import putAuthor from "./authors/putAuthor";
import deleteAuthor from "./authors/deleteAuthor";
import getAuthor from "./authors/getAuthor";

module.exports = {
  "/api/v1/authors": { POST: { ...postAuthor } },
  "/api/v1/authors/:id": {
    PUT: { ...putAuthor },
    DELETE: { ...deleteAuthor },
    GET: { ...getAuthor },
  },
};
