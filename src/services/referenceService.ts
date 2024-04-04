import { pgReferences } from "database";
import { GenericResponse } from "ts/types/genericResponse";
import { Reference } from "ts/types/references";
import { genericErrorResponse } from "utils/genericErrorResponse";
import { logMessage } from "utils/logging";

export async function add(reference: Reference): Promise<GenericResponse> {
  try {
    const { referenceId, createdDate } = await pgReferences.insert(reference);

    return {
      status: 200,
      payload: {
        referenceId,
        createdDate,
      },
    };
  } catch (error) {
    logMessage({ message: error.message, source: "referenceService.add", details: error });
    return genericErrorResponse(500, { details: error.message });
  }
}
