DROP PROCEDURE IF EXISTS usp_insert_logging;
CREATE PROCEDURE usp_insert_logging(
    p_logging_type logging_type,
    p_source VARCHAR(255),
    p_message VARCHAR(1500),
    p_details JSON,
    p_day_retention INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- BEFORE INSERT, clean up the table and keep only "p_day_retention" days of logs
  CALL usp_delete_logging(p_day_retention);

  INSERT INTO public.application_log
  (
    type,
    source,
    message,
    details
  )
  VALUES
  (
    p_logging_type,
    p_source,
    p_message,
    p_details
  );

END;
$$;