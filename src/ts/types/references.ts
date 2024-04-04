import { Author } from "./authors";

export type Reference = {
  referenceId: number;
  title: string;
  description: string;
  scientificJournal: string;
  year: number;
  link: string;
  createdDate: Date;
  lastUpdatedDate: Date;
  authors: Partial<Author>[];
  labels: string[];
};
