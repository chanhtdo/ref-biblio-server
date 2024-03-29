import postAuthor from "./postAuthor";
import putAuthor from "./putAuthor";

module.exports = {
  "/api/v1/authors": { POST: { ...postAuthor } },
  "/api/v1/authors/:id": { PUT: { ...putAuthor } },
};
