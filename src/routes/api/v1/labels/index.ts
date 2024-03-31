import { Router, Response, Request } from "express";
import { validateBody } from "middleware/validate";
import { labelService } from "services";

const router = Router();

router.post("/api/v1/labels", validateBody, async (req: Request, res: Response) => {
  const { value } = req.body;
  const { status, payload } = await labelService.add(value);

  return res.status(status).send(payload);
});

module.exports = router;
