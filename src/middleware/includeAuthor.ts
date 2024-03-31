import { NextFunction, Response, Request } from "express";
import { authorService } from "services";
import { ErrorType } from "ts/enums/errors";
import { LogMessage } from "utils/logging";

export async function includeAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { status, payload: author } = await authorService.get(Number(req.params.id));

    //Include the author in the request object for later use
    req.requestedAuthor = author;
    if (status === 200 && author) return next();

    res.status(404).json({
      timestamp: new Date(),
      type: ErrorType.AuthorNotFound,
    });
    return;
  } catch (error) {
    LogMessage(error.message, "middleware.includeAuthor", error);
    res.status(500).json({
      timestamp: new Date(),
      type: ErrorType.UnexpectedServerError,
      details: error.message,
    });
  }
}
