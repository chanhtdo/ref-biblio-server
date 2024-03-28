import { Router, Response, Request } from "express";
import { validateBody } from "middleware/validate";
import { authorService } from "services";

const router = Router();

router.post("/api/v1/authors", validateBody, async (req: Request, res: Response) => {
  const { body: author } = req;
  const { status, payload } = await authorService.add(author);

  return res.status(status).send(payload);
});

module.exports = router;
