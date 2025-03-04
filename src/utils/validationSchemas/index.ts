import postAuthor from "./authors/postAuthor";
import putAuthor from "./authors/putAuthor";
import deleteAuthor from "./authors/deleteAuthor";
import getAuthor from "./authors/getAuthor";
import listAuthor from "./authors/listAuthor";
import postLabel from "./labels/postLabel";
import deleteLabel from "./labels/deleteLabel";
import listLabel from "./labels/listLabel";
import postReferences from "./references/postReference";

module.exports = {
  "/api/v1/authors": { POST: { ...postAuthor }, GET: { ...listAuthor } },
  "/api/v1/authors/:id": {
    PUT: { ...putAuthor },
    DELETE: { ...deleteAuthor },
    GET: { ...getAuthor },
  },
  "/api/v1/labels": { POST: { ...postLabel }, GET: { ...listLabel } },
  "/api/v1/labels/:value": { DELETE: { ...deleteLabel } },
  "/api/v1/bibliographic-references": { POST: { ...postReferences } },
};
