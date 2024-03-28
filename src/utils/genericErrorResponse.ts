import { ErrorType } from "ts/enums/errors";
import { GenericResponse } from "ts/types/genericResponse";

const errorTypes = {
  400: ErrorType.BadRequest,
  401: ErrorType.Unauthorized,
  403: ErrorType.Forbidden,
  404: ErrorType.NotFound,
  408: ErrorType.RequestTimeout,
  409: ErrorType.Conflict,
  422: ErrorType.UnprocessableContent,
  500: ErrorType.InternalServerError,
  502: ErrorType.BadGateway,
  503: ErrorType.ServiceUnavailable,
  504: ErrorType.GatewayTimeOut,
};

interface ErrorResponseOptions {
  type?: ErrorType;
  details?: string;
}

export const genericErrorResponse = (
  code: number,
  { type, details }: ErrorResponseOptions = {},
): GenericResponse => {
  if (!Object.keys(errorTypes).includes(code.toString())) return;
  return {
    status: code,
    payload: {
      timestamp: new Date(),
      type: type || errorTypes[code],
      ...(details && { details }),
    },
  };
};
