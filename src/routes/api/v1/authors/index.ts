import { Router, Response, Request } from "express";
import { validateBody, validateQuery } from "middleware/validate";
import { authorService } from "services";

const router = Router();

router.post("/api/v1/authors", validateBody, async (req: Request, res: Response) => {
  const { body: author } = req;
  const { status, payload } = await authorService.add(author);

  return res.status(status).send(payload);
});

router.get("/api/v1/authors", validateQuery, async (req: Request, res: Response) => {
  const { query } = req;
  const { status, payload } = await authorService.list(
    query.search?.toString(),
    Number(query.limit),
    Number(query.page),
  );

  return res.status(status).send(payload);
});

module.exports = router;
