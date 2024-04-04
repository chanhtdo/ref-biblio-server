CREATE TABLE IF NOT EXISTS authors (
  author_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  affiliations TEXT[],
  email TEXT UNIQUE,
  research_fields TEXT[],
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP
);

CREATE TABLE IF NOT EXISTS labels (
  label TEXT PRIMARY KEY,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bibliographic_references (
  reference_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title TEXT,
  description TEXT,
  scientific_journal TEXT,
  year INT,
  link TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bibliographic_references_authors (
    reference_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (reference_id, author_id),
    FOREIGN KEY (reference_id) REFERENCES bibliographic_references(reference_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

CREATE TABLE IF NOT EXISTS bibliographic_references_labels (
    reference_id INT NOT NULL,
    label TEXT NOT NULL,
    PRIMARY KEY (reference_id, label),
    FOREIGN KEY (reference_id) REFERENCES bibliographic_references(reference_id),
    FOREIGN KEY (label) REFERENCES labels(label)
);
