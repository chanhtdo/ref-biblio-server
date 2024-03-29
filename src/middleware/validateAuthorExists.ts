import { pgAuthors } from "database";
import { NextFunction, Response, Request } from "express";
import { ErrorType } from "ts/enums/errors";
import { LogMessage } from "utils/logging";

export async function validateAuthorExists(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authors = await pgAuthors.get([Number(req.params.id)]);

    if (authors.length > 0) return next();

    res.status(404).json({
      timestamp: new Date(),
      type: ErrorType.AuthorNotFound,
    });
    return;
  } catch (error) {
    LogMessage(error.message, "middleware.validateAuthorExists", error);
    res.status(500).json({
      timestamp: new Date(),
      type: ErrorType.UnexpectedServerError,
      details: error.message,
    });
  }
}
