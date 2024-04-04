import { Router, Response, Request } from "express";
import { validateBody } from "middleware/validate";
import { referenceService } from "services";

const router = Router();

router.post(
  "/api/v1/bibliographic-references",
  validateBody,
  async (req: Request, res: Response) => {
    const { body: reference } = req;
    const { status, payload } = await referenceService.add(reference);

    return res.status(status).send(payload);
  },
);

module.exports = router;
