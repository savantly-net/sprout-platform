DO $$
BEGIN

  BEGIN
    ALTER TABLE MENU ADD COLUMN renderMode varchar(255);
  EXCEPTION
    WHEN duplicate_column THEN RAISE NOTICE 'currentVersion column already exists on dashboards';
  END;

END $$;
