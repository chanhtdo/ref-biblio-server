DROP FUNCTION IF EXISTS udf_get_labels;
CREATE FUNCTION udf_get_labels(p_search TEXT DEFAULT NULL)
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
  FROM labels l
  WHERE (p_search IS NULL) 
  OR (p_search IS NOT NULL AND l.label iLIKE p_search);

END;
$BODY$;
