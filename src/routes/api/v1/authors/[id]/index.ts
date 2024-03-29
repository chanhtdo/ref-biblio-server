import { Router, Response, Request } from "express";
import { validateBody, validateParams } from "middleware/validate";
import { validateAuthorExists } from "middleware/validateAuthorExists";
import { authorService } from "services";

const router = Router();

router.put(
  "/api/v1/authors/:id",
  validateParams,
  validateBody,
  validateAuthorExists,
  async (req: Request, res: Response) => {
    const { body: author } = req;
    author.authorId = req.params.id;

    const { status, payload } = await authorService.modify(author);

    return res.status(status).send(payload);
  },
);

module.exports = router;
