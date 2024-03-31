DROP FUNCTION IF EXISTS udf_insert_label;
CREATE FUNCTION udf_insert_label(
  p_label TEXT
)
RETURNS TABLE(
  "createdDate" TIMESTAMP
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  
  RETURN QUERY 
  INSERT INTO labels (label)
  VALUES (p_label)
  ON CONFLICT (label) DO NOTHING
  RETURNING created_date;

END;
$BODY$;
