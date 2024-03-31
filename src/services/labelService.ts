import { pgLabels } from "database";
import { ErrorType } from "ts/enums/errors";
import { GenericResponse } from "ts/types/genericResponse";
import { genericErrorResponse } from "utils/genericErrorResponse";
import { LogMessage } from "utils/logging";

export async function add(label: string): Promise<GenericResponse> {
  try {
    const createdDate = await pgLabels.insert(label);

    if (!createdDate)
      return {
        status: 409,
        payload: {
          timestamp: new Date(),
          type: ErrorType.LabelAlreadyExists,
        },
      };

    return {
      status: 200,
      payload: {
        label,
        createdDate,
      },
    };
  } catch (error) {
    LogMessage(error.message, "labelService.add", error);
    return genericErrorResponse(500, { details: error.message });
  }
}
