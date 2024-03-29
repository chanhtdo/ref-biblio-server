DROP PROCEDURE IF EXISTS usp_update_author;
CREATE PROCEDURE usp_update_author(
  p_author_id INT,
  p_first_name TEXT,
  p_middle_name TEXT,
  p_last_name TEXT,
  p_affiliations TEXT[],
  p_email TEXT,
  p_research_fields TEXT[]
)
LANGUAGE plpgsql
AS $BODY$
BEGIN

  UPDATE authors SET
    first_name = p_first_name,
    middle_name = p_middle_name,
    last_name = p_last_name,
    affiliations = p_affiliations,
    email = p_email,
    research_fields = p_research_fields,
    last_updated = CURRENT_TIMESTAMP
  WHERE author_id = p_author_id;
 
END;
$BODY$;
