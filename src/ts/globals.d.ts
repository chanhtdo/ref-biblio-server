import { Author } from "ts/types/authors";

declare global {
  namespace Express {
    export interface Request {
      requestedAuthor?: Author;
    }
  }
}
