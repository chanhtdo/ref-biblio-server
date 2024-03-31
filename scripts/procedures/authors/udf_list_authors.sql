DROP FUNCTION IF EXISTS udf_list_authors;
CREATE FUNCTION udf_list_authors(p_search TEXT DEFAULT NULL)
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
  IF (p_search IS NULL) THEN
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
  ELSE
    RETURN QUERY 
    WITH _authors AS (
      SELECT
          a.author_id,
          a.first_name,
          a.middle_name,
          a.last_name,
          array_to_string(a.affiliations,',') affiliations_str,
          a.email,
          array_to_string(a.research_fields,',') research_fields_str,
          a.created_date,
          a.last_updated,
          a.affiliations,
          a.research_fields
      FROM authors a
    )
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
    FROM _authors a
    WHERE (
      a.first_name iLIKE p_search OR
      a.middle_name iLIKE p_search OR 
      a.last_name iLIKE p_search OR
      a.affiliations_str iLIKE p_search OR
      a.email iLIKE p_search OR
      a.research_fields_str iLIKE p_search
    );
  END IF;
  
END;
$BODY$;
