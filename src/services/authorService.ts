import { pgAuthors } from "database";
import { Author } from "ts/types/authors";
import { GenericResponse } from "ts/types/genericResponse";
import { genericErrorResponse } from "utils/genericErrorResponse";
import { LogMessage } from "utils/logging";

export async function add(author: Author): Promise<GenericResponse> {
  try {
    const { authorId, createdDate } = await pgAuthors.insert(author);

    return {
      status: 200,
      payload: {
        authorId,
        createdDate,
      },
    };
  } catch (error) {
    LogMessage(error.message, "authorService.add", error);
    return genericErrorResponse(500, { details: error.message });
  }
}

export async function modify(author: Author): Promise<GenericResponse> {
  try {
    await pgAuthors.update(author);
    return {
      status: 200,
      payload: {
        timestamp: new Date(),
        mesasage: `Author updated successfully.`,
      },
    };
  } catch (error) {
    LogMessage(error.message, "authorService.modify", error);
    return genericErrorResponse(500, { details: error.message });
  }
}

export async function remove(authorIds: number[]): Promise<GenericResponse> {
  try {
    await pgAuthors.remove(authorIds);
    return {
      status: 200,
      payload: {
        timestamp: new Date(),
        mesasage: `Author(s) deleted successfully.`,
      },
    };
  } catch (error) {
    LogMessage(error.message, "authorService.remove", error);
    return genericErrorResponse(500, { details: error.message });
  }
}

export async function get(authorId: number): Promise<GenericResponse> {
  try {
    const author = await pgAuthors.get(authorId);
    return {
      status: 200,
      payload: author,
    };
  } catch (error) {
    LogMessage(error.message, "authorService.get", error);
    return genericErrorResponse(500, { details: error.message });
  }
}
