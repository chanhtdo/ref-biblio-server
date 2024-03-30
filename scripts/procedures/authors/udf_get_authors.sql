DROP FUNCTION IF EXISTS udf_get_authors;
CREATE FUNCTION udf_get_authors()
RETURNS TABLE(
  "authorId" INT,
  "firstName" TEXT,
  "middleName" TEXT,
  "lastName" TEXT,
  "affiliations" TEXT[],
  "email" TEXT,
  "researchFields" TEXT[],
  "createdDate" TIMESTAMP,
  "lastUpdated" TIMESTAMP
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  
  RETURN QUERY 
  SELECT 
    a.author_id,
    a.first_name,
    a.middle_name,
    a.last_name,
    a.affiliations,
    a.email,
    a.research_fields,
    a.created_date,
    a.last_updated
  FROM authors a;

END;
$BODY$;
