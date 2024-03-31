import { NextFunction, Response, Request } from "express";
import { labelService } from "services";
import { ErrorType } from "ts/enums/errors";
import { logMessage } from "utils/logging";

export async function includeLabel(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status, payload: label } = await labelService.get(req.params.value);

    //Include the label in the request object for later use
    req.requestedLabel = label;
    if (status === 200 && label) return next();

    res.status(404).json({
      timestamp: new Date(),
      type: ErrorType.LabelNotFound,
    });
    return;
  } catch (error) {
    logMessage({ message: error.message, source: "middleware.includeLabel", details: error });
    res.status(500).json({
      timestamp: new Date(),
      type: ErrorType.UnexpectedServerError,
      details: error.message,
    });
  }
}
