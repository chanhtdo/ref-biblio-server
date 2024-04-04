DROP FUNCTION IF EXISTS udf_insert_bibliographic_reference;
CREATE FUNCTION udf_insert_bibliographic_reference(
  p_title TEXT,
  p_description TEXT,
  p_scientific_journal TEXT,
  p_year INT,
  p_link TEXT
)
RETURNS TABLE(
  "referenceId" INT,
  "createdDate" TIMESTAMP
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  
  RETURN QUERY 
  INSERT INTO bibliographic_references (
    title,
    description,
    scientific_journal,
    year,
    link
  )
  VALUES (
    p_title,
    p_description,
    p_scientific_journal,
    p_year,
    p_link
  )
  RETURNING reference_id, created_date;
  
END;
$BODY$;
