import { Router, Response, Request } from "express";
import { validateBody, validateQuery } from "middleware/validate";
import { labelService } from "services";

const router = Router();

router.post("/api/v1/labels", validateBody, async (req: Request, res: Response) => {
  const { value } = req.body;
  const { status, payload } = await labelService.add(value);

  return res.status(status).send(payload);
});

router.get("/api/v1/labels", validateQuery, async (req: Request, res: Response) => {
  const { query } = req;
  const { status, payload } = await labelService.list(
    query.search?.toString(),
    Number(query.limit),
    Number(query.page),
  );

  return res.status(status).send(payload);
});

module.exports = router;
