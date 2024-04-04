import { pgAuthors } from "database";
import { Author } from "ts/types/authors";
import { GenericResponse } from "ts/types/genericResponse";
import { genericErrorResponse } from "utils/genericErrorResponse";
import { logMessage } from "utils/logging";

export async function add(author: Partial<Author>): Promise<GenericResponse> {
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
    logMessage({ message: error.message, source: "authorService.add", details: error });
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
    logMessage({ message: error.message, source: "authorService.modify", details: error });
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
    logMessage({ message: error.message, source: "authorService.remove", details: error });
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
    logMessage({ message: error.message, source: "authorService.get", details: error });
    return genericErrorResponse(500, { details: error.message });
  }
}

export async function list(search: string, limit: number, page: number): Promise<GenericResponse> {
  try {
    const authors = await pgAuthors.list(search, limit, page);

    return {
      status: 200,
      payload: authors,
    };
  } catch (error) {
    logMessage({ message: error.message, source: "authorService.list", details: error });
    return genericErrorResponse(500, { details: error.message });
  }
}
