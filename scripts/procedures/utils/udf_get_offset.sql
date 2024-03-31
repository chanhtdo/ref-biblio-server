DROP FUNCTION IF EXISTS udf_get_offset;
CREATE FUNCTION udf_get_offset(
  p_page_number INT, 
  p_total_count BIGINT, 
  p_limit INT
) 
RETURNS TABLE(
  skip_rows INT
)
LANGUAGE plpgsql
AS $BODY$
BEGIN
  
  -- Calculate the OFFSET for paging
  IF p_total_count IS NULL OR p_total_count = 0 THEN
    RETURN QUERY SELECT 0;
  ELSE 
    IF p_page_number > ceiling(p_total_count::FLOAT/p_limit) THEN 
      p_page_number = ceiling(p_total_count::FLOAT/p_limit);
    ELSE
      IF p_page_number < 1 THEN 
        p_page_number = 1;
      END IF;    
    END IF;
    
    RETURN QUERY SELECT (p_page_number - 1) * p_limit;
  END IF;

END;
$BODY$;
