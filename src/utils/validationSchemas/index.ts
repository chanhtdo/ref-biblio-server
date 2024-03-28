import postAuthors from "./postAuthors";

module.exports = {
  "/api/v1/authors": { POST: { ...postAuthors } },
};
