DROP FUNCTION IF EXISTS udf_get_labels;
CREATE FUNCTION udf_get_labels()
RETURNS TABLE(
  "label" TEXT,
  "createdDate" TIMESTAMP
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  
  RETURN QUERY 
  SELECT 
    l.label,
    l.created_date
  FROM labels l;

END;
$BODY$;
