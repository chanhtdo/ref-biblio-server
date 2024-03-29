import { pgdbAuthors } from "database";
import { Author } from "ts/types/authors";
import { GenericResponse } from "ts/types/genericResponse";
import { genericErrorResponse } from "utils/genericErrorResponse";

export async function add(author: Author): Promise<GenericResponse> {
  try {
    const { authorId, createdDate } = await pgdbAuthors.insert(author);

    return {
      status: 200,
      payload: {
        authorId,
        createdDate,
      },
    };
  } catch (error) {
    return genericErrorResponse(500, { details: error.message });
  }
}

export async function modify(author: Author): Promise<GenericResponse> {
  try {
    await pgdbAuthors.update(author);
    return {
      status: 200,
      payload: {
        timestamp: new Date(),
        mesasage: `Author updated successfully.`,
      },
    };
  } catch (error) {
    return genericErrorResponse(500, { details: error.message });
  }
}
