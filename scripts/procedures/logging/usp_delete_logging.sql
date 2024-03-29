DROP PROCEDURE IF EXISTS usp_delete_logging;
CREATE PROCEDURE usp_delete_logging(
  p_days integer
)
LANGUAGE plpgsql
AS $$
DECLARE _qry_delete TEXT DEFAULT '';
BEGIN
    
  _qry_delete := 'DELETE FROM public.application_log
    WHERE created_date < (SELECT CURRENT_TIMESTAMP - INTERVAL ''%I DAYS'')';
  EXECUTE format(_qry_delete, p_days);

END;
$$;