DROP PROCEDURE IF EXISTS usp_delete_label;
CREATE PROCEDURE usp_delete_label(
  p_label TEXT
)
LANGUAGE plpgsql
AS $BODY$
BEGIN

  DELETE FROM labels WHERE label = p_label;
 
END;
$BODY$;
