DROP FUNCTION IF EXISTS udf_insert_author;
CREATE FUNCTION udf_insert_author(
  p_first_name TEXT,
  p_middle_name TEXT,
  p_last_name TEXT,
  p_affiliations TEXT[],
  p_email TEXT,
  p_research_fields TEXT[]
)
RETURNS TABLE(
  "authorId" INT,
  "createdDate" TIMESTAMP
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  
  RETURN QUERY 
  INSERT INTO authors (
    first_name,
    middle_name,
    last_name,
    affiliations,
    email,
    research_fields
  )
  VALUES (
    p_first_name,
    p_middle_name,
    p_last_name,
    p_affiliations,
    p_email,
    p_research_fields
  )
  RETURNING authors.author_id, authors.created_date;

END;
$BODY$;
