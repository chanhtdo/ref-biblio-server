DROP PROCEDURE IF EXISTS usp_delete_authors;
CREATE PROCEDURE usp_delete_authors(
  p_author_id INT[]
)
LANGUAGE plpgsql
AS $BODY$
BEGIN

  DELETE FROM authors WHERE author_id IN (SELECT unnest(p_author_id));
 
END;
$BODY$;
