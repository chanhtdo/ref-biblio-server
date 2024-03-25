import { Router, Response, Request } from "express";

const router = Router();

router.get("/api/v1/ping", async (req: Request, res: Response) => {
  return res.status(200).send("ok");
});

module.exports = router;
