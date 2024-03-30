import { Router, Response, Request } from "express";
import { validateBody, validateParams } from "middleware/validate";
import { includeAuthor } from "middleware/includeAuthor";
import { authorService } from "services";

const router = Router();

router.put(
  "/api/v1/authors/:id",
  validateParams,
  validateBody,
  includeAuthor,
  async (req: Request, res: Response) => {
    const { body: author } = req;
    author.authorId = Number(req.params.id);

    const { status, payload } = await authorService.modify(author);

    return res.status(status).send(payload);
  },
);

router.delete(
  "/api/v1/authors/:id",
  validateParams,
  includeAuthor,
  async (req: Request, res: Response) => {
    const authorIds = [Number(req.params.id)];
    const { status, payload } = await authorService.remove(authorIds);

    return res.status(status).send(payload);
  },
);

router.get(
  "/api/v1/authors/:id",
  validateParams,
  includeAuthor,
  async (req: Request, res: Response) => {
    const { requestedAuthor } = req;
    return res.status(200).send(requestedAuthor);
  },
);

module.exports = router;
