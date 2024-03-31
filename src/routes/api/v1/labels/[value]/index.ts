import { Router, Response, Request } from "express";
import { includeLabel } from "middleware/includeLabel";
import { validateParams } from "middleware/validate";
import { labelService } from "services";

const router = Router();

router.delete(
  "/api/v1/labels/:value",
  validateParams,
  includeLabel,
  async (req: Request, res: Response) => {
    const { status, payload } = await labelService.remove(req.params.value);
    return res.status(status).send(payload);
  },
);

module.exports = router;
