import { pgAuthors } from "database";
import { Router, Response, Request } from "express";
import { validateBody } from "middleware/validate";
import { authorService } from "services";

const router = Router();

router.post("/api/v1/authors", validateBody, async (req: Request, res: Response) => {
  const { body: author } = req;
  const { status, payload } = await authorService.add(author);

  return res.status(status).send(payload);
});

router.get("/api/v1/authors", async (req: Request, res: Response) => {
  //const {status, payload} = pgAuthors.get();
  return res.status(200).send("payload");
});

module.exports = router;
