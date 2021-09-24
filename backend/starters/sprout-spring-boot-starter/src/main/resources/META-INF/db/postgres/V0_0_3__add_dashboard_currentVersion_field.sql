DO $$
BEGIN

  BEGIN
    ALTER TABLE DASHBOARDS ADD COLUMN currentVersion boolean not null DEFAULT false;
  EXCEPTION
    WHEN duplicate_column THEN RAISE NOTICE 'currentVersion column already exists on dashboards';
  END;
  BEGIN
    -- message existed in earlier version but was missed when switching to migrations
    ALTER TABLE DASHBOARDS ADD COLUMN message varchar(256);
  EXCEPTION
    WHEN duplicate_column THEN RAISE NOTICE 'message column already exists on dashboards';
  END;

END $$;
